export enum ChartType {
  pizza = "pizza",
  barVertical = "bar",
  barVerticalMultiple = "grouped_bar",
  barHorizontal = "horizontal_bar",
  barNegative = "negative_bar",
  line = "line",
  lineMultiple = "line_multiple",
  radar = "radar_",
  area = "area",
  //areaStacked = "areaStacked",
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

  [ChartType.barVerticalMultiple]: {
    label: "Bar Chart - Multiple",
    image: "/src/assets/charts/bar-vertical-multiple.png",
    description: "Compares groups using multiple vertical bars.",
  },
  [ChartType.barHorizontal]: {
    label: "Bar Chart - Horizontal",
    image: "/src/assets/charts/bar-horizontal.png",
    description: "Shows data with horizontal bars.",
  },
  [ChartType.barNegative]: {
    label: "Bar Chart - Negative",
    image: "/src/assets/charts/bar-negative.png",
    description: "Displays positives and negatives values.",
  },
  [ChartType.line]: {
    label: "Line Chart",
    image: "/src/assets/charts/line.png",
    description: "Connects data points with lines.",
  },

  [ChartType.lineMultiple]: {
    label: "Line Chart - Multiple",
    image: "/src/assets/charts/line-multiple.png",
    description: "Compares trends with multiple lines.",
  },
  [ChartType.radar]: {
    label: "Radar Chart - Multiple",
    image: "/src/assets/charts/radar.png",
    description: "Compares multiple variables in a radar.",
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
