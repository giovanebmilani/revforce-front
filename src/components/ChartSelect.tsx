export enum ChartType {
  pizza = "pizza",
  barVertical = "bar",
  barHorizontal = "horizontal_bar",
  line = "line",
  area = "area",
}

export const ChartTypeData: Record<
  ChartType,
  { label: string; image: string; description: string }
> = {
  [ChartType.pizza]: {
    label: "Gráfico de Pizza",
    image: "/src/assets/charts/pizza.png",
    description: "Exibe proporções como fatias de um círculo.",
  },
  [ChartType.barVertical]: {
    label: "Gráfico de Barras - Vertical",
    image: "/src/assets/charts/bar-vertical.png",
    description: "Mostra dados com barras verticais claras.",
  },
  [ChartType.barHorizontal]: {
    label: "Gráfico de Barras - Horizontal",
    image: "/src/assets/charts/bar-horizontal.png",
    description: "Exibe dados por meio de barras horizontais.",
  },
  [ChartType.line]: {
    label: "Gráfico de Linha",
    image: "/src/assets/charts/line.png",
    description: "Conecta pontos de dados usando linhas.",
  },
  [ChartType.area]: {
    label: "Gráfico de Área",
    image: "/src/assets/charts/area.png",
    description: "Preenche a área sob a linha para mostrar volume.",
  },
};


interface ChartTypeProps {
  type: ChartType;
  onClick?: () => void;
  isSelected?: boolean;
}

function ChartSelect({ type, onClick, isSelected}: ChartTypeProps) {
  const { label, image, description } = ChartTypeData[type];

  return (
    <div
      className={`max-w-full rounded-xl flex flex-col items-center bg-white border-1 ${isSelected ? "border-blue-500 shadow-lg" : "border-gray-300"}`}
      onClick={onClick}
    >
      <img
        src={image}
        alt={label}
        className="w-full h-60 object-content overflow-hidden rounded-t-xl"
      />
      <div className="p-2 text-center">
        <h2 className="text-sm font-semibold whitespace-nowrap">{label}</h2>
        <p className="text-xs text-gray-500 text-justify">{description}</p>
      </div>
    </div>
  );
}

export default ChartSelect;
