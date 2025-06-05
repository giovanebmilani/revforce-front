import { ChartResponse, PeriodType } from "@/api/charts";

interface ChartDataItem {
  identifier: string;
  [key: string]: number | string;
}

interface SeriesMetadata {
  friendlyName: string;
  color: string;
}

function truncateDate(date: Date, granularity: PeriodType): Date {
  const newDate = new Date(date);
  switch (granularity) {
    case "day":
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
    case "day":
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
      case "day":
        current.setDate(current.getDate() + 1);
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

function getSourceName(sourceTable: string, sourceId: string): string {
  return sourceTable === "campaign"
    ? `Campanha #${sourceId}`
    : `Anúncio #${sourceId}`;
}

function generateConsistentColor(key: string): string {
  // Função de hash simples para converter string em número
  let hash = 0;
  for (let i = 0; i < key.length; i++) {
    hash = key.charCodeAt(i) + ((hash << 5) - hash);
  }

  // Gerar componentes RGB baseadas no hash
  const r = (hash & 0xff0000) >> 16;
  const g = (hash & 0x00ff00) >> 8;
  const b = hash & 0x0000ff;

  // Suavizar as cores para evitar tons muito escuros/claros
  const adjustedR =
    Math.min(200, Math.max(80, r)) + Math.floor(Math.random() * 56);
  const adjustedG =
    Math.min(200, Math.max(80, g)) + Math.floor(Math.random() * 56);
  const adjustedB =
    Math.min(200, Math.max(80, b)) + Math.floor(Math.random() * 56);

  return `#${adjustedR.toString(16).padStart(2, "0")}${adjustedG.toString(16).padStart(2, "0")}${adjustedB.toString(16).padStart(2, "0")}`;
}

function getMetricName(metric: string): string {
  switch (metric) {
    case "impression":
      return "Impressoes";
    case "spend":
      return "Investimento";
    case "ctr":
      return "Taxa de Cliques (CTR)";
    case "click":
      return "Cliques";
  }
  return metric;
}

export function treatChartData(response: ChartResponse): {
  data: ChartDataItem[];
  metadata: Record<string, SeriesMetadata>;
} {
  const granularity = response.chart.granularity.type;
  const segmentField = response.chart.segment;

  // 1. Gerar todas as combinações de fonte e métrica do gráfico
  const sourceMetricKeys = new Set<string>();
  response.chart.sources.forEach((source) => {
    source.metrics.forEach((metric) => {
      const baseKey = `${source.source_id}_${source.source_table}_${metric}`;
      sourceMetricKeys.add(baseKey);
    });
  });

  // 2. Coletar valores de segmento (se aplicável)
  const segmentValues = new Set<string>();
  if (segmentField) {
    response.data.forEach((item) => {
      const value = item[segmentField];
      if (value) segmentValues.add(String(value));
    });
    // Garantir pelo menos um valor padrão
    if (segmentValues.size === 0) segmentValues.add("All");
  }

  // 3. Gerar chaves completas (fonte + métrica + segmento)
  const allKeys = new Set<string>();
  sourceMetricKeys.forEach((baseKey) => {
    if (segmentField && segmentValues.size > 0) {
      segmentValues.forEach((segVal) => {
        allKeys.add(`${baseKey}_${segVal}`);
      });
    } else {
      allKeys.add(baseKey);
    }
  });

  // 4. Gerar intervalo de datas completo
  const dates = response.data.map((item) => new Date(item.date));
  const minDate = truncateDate(
    new Date(Math.min(...dates.map((d) => d.getTime()))),
    granularity
  );
  const maxDate = truncateDate(
    new Date(Math.max(...dates.map((d) => d.getTime()))),
    granularity
  );
  const dateRange = generateDateRange(minDate, maxDate, granularity);

  // 5. Agregar dados por identificador e chave
  const aggregated = new Map<string, Record<string, number>>();
  response.data.forEach((item) => {
    const date = new Date(item.date);
    const truncatedDate = truncateDate(date, granularity);
    const identifier = formatDate(truncatedDate, granularity);

    // Construir chave base (fonte + métrica)
    const baseKey = `${item.source_id}_${item.source_table}_${item.metric}`;

    // Construir chave completa (adicionar segmento se existir)
    const segmentValue = segmentField
      ? String(item[segmentField] || "All")
      : "";
    const fullKey = segmentField ? `${baseKey}_${segmentValue}` : baseKey;

    // Ignorar chaves não presentes no gráfico
    if (!allKeys.has(fullKey)) return;

    if (!aggregated.has(identifier)) {
      aggregated.set(identifier, {});
    }

    const entry = aggregated.get(identifier)!;
    entry[fullKey] = (entry[fullKey] || 0) + item.value;
  });

  // 6. Preencher dados faltantes mantendo valores anteriores
  const result: ChartDataItem[] = [];
  const lastValues: Record<string, number> = {};

  // Inicializar valores anteriores
  allKeys.forEach((key) => {
    lastValues[key] = 0;
  });

  dateRange.forEach((date) => {
    const identifier = formatDate(date, granularity);
    const itemData = aggregated.get(identifier) || {};
    const newItem: ChartDataItem = { identifier };

    // Atualizar valores para todas as chaves
    allKeys.forEach((key) => {
      if (itemData[key] !== undefined) {
        newItem[key] = itemData[key];
        lastValues[key] = itemData[key];
      } else {
        newItem[key] = lastValues[key];
      }
    });

    result.push(newItem);
  });

  const metadata: Record<string, SeriesMetadata> = {};
  allKeys.forEach((key) => {
    const [sourceId, sourceTable, metric] = key.split("_");
    metadata[key] = {
      friendlyName: `${getSourceName(sourceTable, sourceId)} - ${getMetricName(metric)}`,
      color: generateConsistentColor(key),
    };
  });

  return { data: result, metadata };
}
