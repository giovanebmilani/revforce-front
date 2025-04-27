import LabelInput from "@/components/LabelInput";
import { SelectBox } from "@/components/SelectBox";
import { Button } from "@/components/ui/button";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import ChartSelect, { ChartType, ChartTypeData } from "@/components/ChartSelect";
import { CarouselSize } from "@/components/Carousel";
import { usePostNewChart } from "@/hooks/chart/usePostNewChart";

export const Route = createFileRoute("/revforce/dashboard/newchart")({
  component: RouteComponent,
});

type MetricType = "ctr" | "click" | "impressions" | "spend";
type PeriodType = "day" | "week" | "month" | "year";
type SourceType = "campaign" | "ad";
type SegmentType = "source" | "segment";

function RouteComponent() {
  const charts = [
    <ChartSelect
      onClick={() => setSelectedChart(ChartType.barVertical)}
      key={ChartType.barVertical}
      type={ChartType.barVertical}
    ></ChartSelect>,
    <ChartSelect
      onClick={() => setSelectedChart(ChartType.barVerticalMultiple)}
      key={ChartType.barVerticalMultiple}
      type={ChartType.barVerticalMultiple}
    ></ChartSelect>,
    <ChartSelect
      onClick={() => setSelectedChart(ChartType.barHorizontal)}
      key={ChartType.barHorizontal}
      type={ChartType.barHorizontal}
    ></ChartSelect>,
    <ChartSelect
      onClick={() => setSelectedChart(ChartType.barNegative)}
      key={ChartType.barNegative}
      type={ChartType.barNegative}
    ></ChartSelect>,
    <ChartSelect
      onClick={() => setSelectedChart(ChartType.pizza)}
      key={ChartType.pizza}
      type={ChartType.pizza}
    ></ChartSelect>,
    <ChartSelect
      onClick={() => setSelectedChart(ChartType.line)}
      key={ChartType.line}
      type={ChartType.line}
    ></ChartSelect>,
    <ChartSelect
      key={ChartType.lineMultiple}
      type={ChartType.lineMultiple}
    ></ChartSelect>,
    <ChartSelect key={ChartType.radar} type={ChartType.radar}></ChartSelect>,
    <ChartSelect key={ChartType.area} type={ChartType.area}></ChartSelect>,
  ];

  const [name, setName] = useState("");
  const [selectedChart, setSelectedChart] = useState<ChartType | string>("");
  const [selectedMetric, setSelectedMetric] = useState<MetricType | string>("");
  const [selectedPeriodType, setSelectedPeriodType] = useState<
    PeriodType | string
  >("");
  const [selectedPeriodAmount, setSelectedPeriodAmount] = useState<string>("");
  const [selectedGranularityType, setSelectedGranularityType] = useState<
    PeriodType | string
  >("");
  const [selectedGranularityAmount, setSelectedGranularityAmount] =
    useState<string>("");
  const [selectedSource, setSelectedSource] = useState<SourceType | string>("");
  const [selectedSegment, setSelectedSegment] = useState<SegmentType | string>(
    ""
  );

  const navigate = useNavigate();

  const { mutate: postNewChart, isPending: isPostNewChartPending } =
    usePostNewChart({
      onSuccess: () => {
        setName("");
        setSelectedChart("");
        setSelectedMetric("");
        setSelectedPeriodType("");
        setSelectedPeriodAmount("");
        setSelectedGranularityType("");
        setSelectedGranularityAmount("");
        setSelectedSource("");
        setSelectedSegment("");
      },
    });

  const handleCreateChart = () => {
    postNewChart({
      name: name,
      type: selectedChart,
      metric: selectedMetric,
      period: {
        type: selectedPeriodType,
        amount: Number(selectedPeriodAmount),
      },
      granularity: {
        type: selectedGranularityType,
        amount: Number(selectedGranularityAmount),
      },
      sources: [
        {
          source_table: selectedSource,
          source_id: "1",
        },
      ],
      segment: selectedSegment,
    });
  };

  return (
    <div className="flex flex-col w-full gap-3">
      <h2 className="text-gray-300">Dashboard /</h2>
      <h1 className="text-2xl font-semibold italic mb-3">New Chart</h1>
      <hr className="ml-[-32px] max-w-screen border-gray-200 mb-2" />

      <div className="w-[360px]">
        <LabelInput
          inputTitle="Name:"
          props={{
            placeholder: "Name",
            value: name,
            onChange: (e) => setName(e.target.value),
            required: true,
          }}
        ></LabelInput>
      </div>

      <section className="flex flex-col w-fit rounded-sm border-1">
        <h2 className="font-semibold p-4">Charts</h2>
        <hr className="border-1" />
        <div className="flex-1 px-4 py-4">
          <CarouselSize children={charts}></CarouselSize>
        </div>
        <div className="flex px-4 pb-4 gap-2">
          <h3 className="font-semibold">Selected:</h3>
          <p>{ChartTypeData[selectedChart as ChartType]?.label}</p>
        </div>
      </section>

      <div className="w-[360px]">
        <h3 className="font-medium">Chart Metric:</h3>
        <SelectBox
          items={[
            { value: "ctr", label: "CTR" },
            { value: "click", label: "Click's" },
            { value: "impression", label: "Impressions" },
            { value: "spend", label: "Spend" },
          ]}
          selectLabel="Chart Metric"
          placeholderText="Select the metric to display in the chart..."
          onChange={setSelectedMetric}
          className="w-full"
        ></SelectBox>
      </div>

      <hr className="ml-[-32px] w-[392px] border-gray-200 mt-2" />

      <div className="w-[360px]">
        <h3 className="font-medium">Chart Period:</h3>

        <h3 className="font-medium mt-2">Type</h3>
        <SelectBox
          items={[
            { value: "hour", label: "Hour" },
            { value: "day", label: "Day" },
            { value: "week", label: "Week" },
            { value: "month", label: "Month" },
          ]}
          selectLabel="Chart Period"
          placeholderText="Select the metric to display in the chart..."
          onChange={setSelectedPeriodType}
          className="w-full mb-2"
        ></SelectBox>

        <LabelInput
          inputTitle="Amount"
          props={{
            type: "number",
            min: 1,
            placeholder: "Period Amount",
            value: selectedPeriodAmount,
            onChange: (e) => setSelectedPeriodAmount(e.target.value),
          }}
        ></LabelInput>
      </div>

      <hr className="ml-[-32px] w-[392px] border-gray-200 mt-2" />

      {selectedChart !== ChartType.pizza && (
        <div className="w-[360px]">
          <h3 className="font-medium">Chart Granularity:</h3>

          <h3 className="font-medium mt-2">Type</h3>
          <SelectBox
            items={[
              { value: "hour", label: "Hour" },
              { value: "day", label: "Day" },
              { value: "week", label: "Week" },
              { value: "month", label: "Month" },
            ]}
            selectLabel="Chart Granularity"
            placeholderText="Select the granularity to display in the chart..."
            onChange={setSelectedGranularityType}
            className="w-full mb-2"
          ></SelectBox>

          <LabelInput
            inputTitle="Amount"
            props={{
              type: "number",
              min: 1,
              placeholder: "Period Amount",
              value: selectedGranularityAmount,
              onChange: (e) => setSelectedGranularityAmount(e.target.value),
            }}
          ></LabelInput>

          <hr className="ml-[-32px] w-[392px] border-gray-200 mt-5" />
        </div>
      )}

      <div className="w-[360px]">
        <h3 className="font-medium">Chart Source:</h3>
        <SelectBox
          items={[
            { value: "campaign", label: "Campaign" },
            { value: "ad", label: "Ad" },
          ]}
          selectLabel="Chart Source:"
          placeholderText="Select the source to display in the chart..."
          onChange={setSelectedSource}
          className="w-full"
        ></SelectBox>
      </div>

      <hr className="ml-[-32px] w-[392px] border-gray-200 mt-2" />

      <div className="w-[360px]">
        <h3 className="font-medium">Chart Segment:</h3>
        <SelectBox
          items={[
            { value: "device", label: "Device" },
            { value: "date", label: "Date" },
          ]}
          selectLabel="Chart Segment:"
          placeholderText="Select the segment to display in the chart..."
          onChange={setSelectedSegment}
          className="w-full"
        ></SelectBox>
      </div>

      <hr className="ml-[-32px] w-[392px] border-gray-200 mt-2" />

      <div className="flex gap-3 lg:gap-5 justify-between lg:mr-0 lg:justify-end">
        <Button
          variant="secondaryPointer"
          className="w-40"
          onClick={() => {
            navigate({ to: "/revforce/dashboard" });
          }}
        >
          Cancel
        </Button>
        <Button
          variant="pointer"
          className="w-40"
          onClick={() => {
            handleCreateChart();
          }}
        >
          {isPostNewChartPending ? "Creating..." : "Create"}
        </Button>
      </div>
    </div>
  );
}
