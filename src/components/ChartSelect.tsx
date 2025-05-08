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
    label: "Pizza Chart",
    image: "/src/assets/charts/pizza.png",
    description: "Displays proportions as slices of a circle.",
  },
  [ChartType.barVertical]: {
    label: "Bar Chart - Vertical",
    image: "/src/assets/charts/bar-vertical.png",
    description: "Displays data clearly with vertical bars.",
  },
  [ChartType.barHorizontal]: {
    label: "Bar Chart - Horizontal",
    image: "/src/assets/charts/bar-horizontal.png",
    description: "Shows data with horizontal bars.",
  },
  [ChartType.line]: {
    label: "Line Chart",
    image: "/src/assets/charts/line.png",
    description: "Connects data points with lines.",
  },
  [ChartType.area]: {
    label: "Area Chart",
    image: "/src/assets/charts/area.png",
    description: "Fills the area below a line to show volume.",
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
        className="w-full min-h-30 object-content overflow-hidden rounded-t-xl"
      />
      <div className="p-2 text-center">
        <h2 className="text-sm font-semibold whitespace-nowrap">{label}</h2>
        <p className="text-xs text-gray-500 text-justify">{description}</p>
      </div>
    </div>
  );
}

export default ChartSelect;
