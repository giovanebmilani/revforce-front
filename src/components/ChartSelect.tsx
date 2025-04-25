export enum ChartType {
  pizza = "pizza",
  barVertical = "bar",
  barVerticalMultiple = "grouped_bar",
  barHorizontal = "horizontal_bar",
  line = "line",
  //lineMultiple = "lineMultiple",
  //area = "area",
  //areaStacked = "areaStacked",
}


const ChartTypeData: Record<
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
  [ChartType.line]: {
    label: "Line Chart",
    image: "/src/assets/charts/line.png",
    description: "Connects data points with lines.",
  },
  /*
  [ChartType.lineMultiple]: {
    label: "Line Chart - Multiple",
    image: "/src/assets/charts/line-multiple.png",
    description:
      "Compares trends with multiple lines.",
  },
  [ChartType.area]: {
    label: "Area Chart",
    image: "/src/assets/charts/area.png",
    description: "Fills the area below a line to show volume.",
  },
  [ChartType.areaStacked]: {
    label: "Area Chart - Stacked",
    image: "/src/assets/charts/area-stacked.png",
    description: "Stacks areas to show overall change.",
  },
  */
};

interface ChartTypeProps {
  type: ChartType;
  onClick?: () => void;
}

function ChartSelect({ type, onClick }: ChartTypeProps) {
  const { label, image, description } = ChartTypeData[type];

  return (
    <div className="rounded-xl flex flex-col items-center bg-white hover:cursor-pointer" onClick={onClick}>
      <img
        src={image}
        alt={label}
        className="w-full h-30 md:h-40 object-cover rounded-t-xl"
      />
      <div className="p-2 text-center">
        <h2 className="text-sm font-semibold whitespace-nowrap">{label}</h2>
        <p className="text-xs text-gray-500 text-justify">{description}</p>
      </div>
    </div>
  );
}

export default ChartSelect;
