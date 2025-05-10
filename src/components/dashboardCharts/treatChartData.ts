import { ChartResponse, PeriodType } from "@/api/charts";

interface ChartDataItem {
  identifier: string;
  [key: string]: number | string;
}

function truncateDate(date: Date, granularity: PeriodType): Date {
  const newDate = new Date(date);
  switch (granularity) {
    case "hour":
      newDate.setMinutes(0, 0, 0);
      break;
    case "day":
      newDate.setHours(0, 0, 0, 0);
      break;
    case "week":
      const day = newDate.getDay();
      const diff = newDate.getDate() - day + (day === 0 ? -6 : 1);
      newDate.setDate(diff);
      newDate.setHours(0, 0, 0, 0);
      break;
    case "month":
      newDate.setDate(1);
      newDate.setHours(0, 0, 0, 0);
      break;
    default:
      newDate.setHours(0, 0, 0, 0);
  }
  return newDate;
}

function formatDate(date: Date, granularity: PeriodType): string {
  switch (granularity) {
    case "hour":
      return date.toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
      });

    case "day":
      return date.toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
      });

    case "week":
      return date.toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
      });

    case "month":
      return date.toLocaleDateString("pt-BR", {
        month: "short",
      });

    default:
      return date.toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "2-digit",
      });
  }
}

function generateDateRange(
  start: Date,
  end: Date,
  granularity: PeriodType
): Date[] {
  const dates: Date[] = [];
  let current = new Date(start);

  while (current <= end) {
    dates.push(new Date(current));
    switch (granularity) {
      case "hour":
        current.setHours(current.getHours() + 1);
        break;
      case "day":
        current.setDate(current.getDate() + 1);
        break;
      case "week":
        current.setDate(current.getDate() + 7);
        break;
      case "month":
        current.setMonth(current.getMonth() + 1);
        break;
      default:
        current.setDate(current.getDate() + 1);
    }
  }
  return dates;
}

export function treatChartData(response: ChartResponse): ChartDataItem[] {
  const granularity = response.chart.granularity.type;
  const segmentField = response.chart.segment;

  // Agrupar dados por identificador e segmento
  const aggregated = new Map<string, Record<string, number>>();
  response.data.forEach((item) => {
    const truncatedDate = truncateDate(new Date(item.date), granularity);
    const identifier = formatDate(truncatedDate, granularity);
    const segmentValue = segmentField
      ? String(item[segmentField] || "All")
      : "All";

    if (!aggregated.has(identifier)) {
      aggregated.set(identifier, {});
    }
    const entry = aggregated.get(identifier)!;
    entry[segmentValue] = (entry[segmentValue] || 0) + item.value;
  });

  // Converter para array de ChartDataItem
  const chartData: ChartDataItem[] = [];
  aggregated.forEach((segments, identifier) => {
    const item: ChartDataItem = { identifier };
    Object.entries(segments).forEach(([key, value]) => {
      item[key] = value;
    });
    chartData.push(item);
  });

  // Gerar intervalo de datas completo baseado nos dados
  const dates = response.data.map((item) => new Date(item.date));
  const minDate = truncateDate(
    new Date(Math.min(...dates.map((d) => new Date(d).getTime()))),
    granularity
  );
  const maxDate = truncateDate(
    new Date(Math.max(...dates.map((d) => d.getTime()))),
    granularity
  );
  const dateRange = generateDateRange(minDate, maxDate, granularity);

  // Mapear identificadores existentes
  const identifierMap = new Map<string, ChartDataItem>();
  chartData.forEach((item) => identifierMap.set(item.identifier, item));

  // Preencher dados com intervalos ausentes
  const filledData: ChartDataItem[] = [];
  let previousItem: ChartDataItem | null = null;
  dateRange.forEach((date) => {
    const identifier = formatDate(date, granularity);
    const currentItem = identifierMap.get(identifier);

    if (currentItem) {
      filledData.push(currentItem);
      previousItem = currentItem;
    } else {
      const newItem: ChartDataItem = { identifier };
      if (previousItem) {
        Object.keys(previousItem).forEach((key) => {
          if (key !== "identifier") {
            newItem[key] = previousItem![key];
          }
        });
      } else {
        // Inicializar com All: 0 se segmento existir
        newItem[segmentField ? "All" : "value"] = 0;
      }
      filledData.push(newItem);
      previousItem = newItem;
    }
  });

  // Coletar todos os segmentos
  const allSegments = new Set<string>();
  filledData.forEach((item) => {
    Object.keys(item).forEach((key) => {
      if (key !== "identifier") {
        allSegments.add(key);
      }
    });
  });

  // Preencher segmentos ausentes com valores anteriores
  let previousValues: Record<string, number> = {};
  filledData.forEach((item) => {
    const currentValues: Record<string, number> = { ...previousValues };
    Object.entries(item).forEach(([key, value]) => {
      if (key !== "identifier") {
        currentValues[key] = value as number;
      }
    });
    allSegments.forEach((segment) => {
      if (!(segment in currentValues)) {
        currentValues[segment] = previousValues[segment] || 0;
      }
    });
    // Atualizar item com todos os segmentos
    Object.keys(item).forEach((key) => {
      if (key !== "identifier") {
        delete item[key];
      }
    });
    Object.entries(currentValues).forEach(([key, value]) => {
      item[key] = value;
    });
    previousValues = currentValues;
  });

  return filledData;
}
