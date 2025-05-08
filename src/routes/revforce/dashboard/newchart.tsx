import LabelInput from "@/components/LabelInput";
import { SelectBox } from "@/components/SelectBox";
import { Button } from "@/components/ui/button";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import ChartSelect, { ChartType } from "@/components/ChartSelect";
import { CarouselSize } from "@/components/Carousel";
import { usePostNewChart } from "@/hooks/chart/usePostNewChart";
import { Plus } from "lucide-react";
import { useGetAllCampaignsByUserId } from "@/hooks/campaign/getAllCamapignsByUserId";
import { useGetAllAdsByUserId } from "@/hooks/ad/getAllAdsByUserId";
import { Input } from "@/components/ui/input";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";

export const Route = createFileRoute("/revforce/dashboard/newchart")({
  component: RouteComponent,
});

type MetricType = "ctr" | "click" | "impressions" | "spend";
type PeriodType = "day" | "week" | "month" | "year";
type SourceType = "campaign" | "ad";
type SegmentType = "date" | "device";

function RouteComponent() {
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
  const [selectedSourcesTable, setSelectedSourcesTable] = useState<
    SourceType[] | string[]
  >([]);
  const [selectedSources, setSelectedSources] = useState<string[]>([]);
  const [selectedSegment, setSelectedSegment] = useState<SegmentType | string>(
    "device"
  );
  const [sourceClick, setSourceClick] = useState(0);

  const navigate = useNavigate();

  const charts = [
    <ChartSelect
      onClick={() => setSelectedChart(ChartType.barVertical)}
      key={ChartType.barVertical}
      type={ChartType.barVertical}
      isSelected={selectedChart === ChartType.barVertical}
    ></ChartSelect>,
    <ChartSelect
      onClick={() => setSelectedChart(ChartType.barHorizontal)}
      key={ChartType.barHorizontal}
      type={ChartType.barHorizontal}
      isSelected={selectedChart === ChartType.barHorizontal}
    ></ChartSelect>,
    <ChartSelect
      onClick={() => setSelectedChart(ChartType.pizza)}
      key={ChartType.pizza}
      type={ChartType.pizza}
      isSelected={selectedChart === ChartType.pizza}
    ></ChartSelect>,
    <ChartSelect
      onClick={() => setSelectedChart(ChartType.line)}
      key={ChartType.line}
      type={ChartType.line}
      isSelected={selectedChart === ChartType.line}
    ></ChartSelect>,
    <ChartSelect
      key={ChartType.area}
      type={ChartType.area}
      onClick={() => setSelectedChart(ChartType.area)}
      isSelected={selectedChart === ChartType.area}
    ></ChartSelect>,
  ];

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
        setSelectedSources([]);
        setSelectedSegment("");
        toast.success("Chart created successfully! 🎉");
        setTimeout(() => {
          navigate({ to: "/revforce/dashboard" });
        }, 2500);
      },
      onError: (error: any) => {
        toast.error("Error creating chart", {
          description: (
            <span className="text-red-500">{error.response.data.detail}</span>
          ),
        });
      },
    });

  const {
    data: getAllCampaigns,
    isLoading: isLoadingAllCampaigns,
    isError: isErrorAllCapaigns,
  } = useGetAllCampaignsByUserId("44fff391-5f37-4dd8-bd28-699e5d7e1824");

  const {
    data: getAllAds,
    isLoading: isLoadingAllAds,
    isError: isErrorAllAds,
  } = useGetAllAdsByUserId("44fff391-5f37-4dd8-bd28-699e5d7e1824");

  const handleCreateChart = () => {
    if (!name) {
      toast.error("Error creating chart", {
        description: (
          <span className="text-red-500">
            Please enter a name for the chart.
          </span>
        ),
      });
      return;
    }
    if (!selectedChart) {
      toast.error("Error creating chart", {
        description: (
          <span className="text-red-500">Please select a chart type.</span>
        ),
      });
      return;
    }
    if (!selectedMetric) {
      toast.error("Error creating chart", {
        description: (
          <span className="text-red-500">Please select a metric.</span>
        ),
      });
      return;
    }
    if (!selectedPeriodType) {
      toast.error("Error creating chart", {
        description: (
          <span className="text-red-500">Please select a period type.</span>
        ),
      });
      return;
    }
    if (!selectedPeriodAmount) {
      toast.error("Error creating chart", {
        description: (
          <span className="text-red-500">Please enter a period amount.</span>
        ),
      });
      return;
    }
    if (!selectedGranularityType) {
      toast.error("Error creating chart", {
        description: (
          <span className="text-red-500">
            Please select a granularity type.
          </span>
        ),
      });
      return;
    }
    if (!selectedGranularityAmount) {
      toast.error("Error creating chart", {
        description: (
          <span className="text-red-500">
            Please enter a granularity amount.
          </span>
        ),
      });
      return;
    }
    if (selectedSources.length === 0) {
      toast.error("Error creating chart", {
        description: (
          <span className="text-red-500">
            Please select at least one source.
          </span>
        ),
      });
      return;
    }
    if (selectedSourcesTable.length === 0) {
      toast.error("Error creating chart", {
        description: (
          <span className="text-red-500">
            Please select at least one source table.
          </span>
        ),
      });
      return;
    }
    if (selectedSources.length !== selectedSourcesTable.length) {
      toast.error("Error creating chart", {
        description: (
          <span className="text-red-500">
            Please select a source table for each source.
          </span>
        ),
      });
      return;
    }
    if (
      selectedSourcesTable.filter((source) => source === undefined).length > 0
    ) {
      toast.error("Error creating chart", {
        description: (
          <span className="text-red-500">
            Please select a source table for each source.
          </span>
        ),
      });
      return;
    }

    postNewChart({
      account_id: "44fff391-5f37-4dd8-bd28-699e5d7e1824",
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
      sources: createSource(),
      segment: selectedSegment,
    });
  };

  const createSource = () => {
    return selectedSources.map((source, index) => ({
      source_id: selectedSourcesTable[index],
      source_table: source,
    }));
  };

  const formattedCampaigns = getAllCampaigns?.map((campaign: any) => ({
    value: campaign.id,
    label: campaign.name,
  }));

  const formattedAds = getAllAds?.map((ad: any) => ({
    value: ad.id,
    label: ad.name,
  }));

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
        <div className="flex-1 px-2 py-2">
          <CarouselSize children={charts}></CarouselSize>
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
        <div className="flex items-center gap-2">
          <h3 className="font-medium">Add chart source</h3>
          <Button
            onClick={() => setSourceClick(sourceClick + 1)}
            className="hover: cursor-pointer"
          >
            <Plus className="w-4 h-4" />
          </Button>
        </div>

        <div>
          {Array.from({ length: sourceClick }).map((_, index) => (
            <div key={index} className="mb-5">
              <h3 className="font-medium">Chart Source {index + 1}</h3>
              <SelectBox
                items={[
                  { value: "campaign", label: "Campaign" },
                  { value: "ad", label: "Ad" },
                ]}
                selectLabel={`Chart Source ${index + 1}:`}
                placeholderText="Select the source to display in the chart..."
                onChange={(value) => {
                  setSelectedSources((prev) => {
                    const updatedSources = [...prev];
                    updatedSources[index] = value;
                    return updatedSources;
                  });
                }}
                className="mb-2"
              />

              {selectedSources[index] === "ad" && (
                <div className="mb-2">
                  <h3 className="font-medium">Source Table {index + 1}</h3>
                  {isLoadingAllAds ? (
                    <Input placeholder="Loading..." readOnly />
                  ) : isErrorAllAds ? (
                    <Input placeholder="Error loading ads" readOnly />
                  ) : getAllAds.length === 0 ? (
                    <Input placeholder="No ads found" readOnly />
                  ) : (
                    <SelectBox
                      items={formattedAds}
                      selectLabel={`Source Table ${index + 1}:`}
                      placeholderText="Select the source to display in the chart..."
                      onChange={(value) => {
                        setSelectedSourcesTable((prev) => {
                          const updatedSources = [...prev];
                          updatedSources[index] = value;
                          return updatedSources;
                        });
                      }}
                      className="w-full mb-2"
                    ></SelectBox>
                  )}
                </div>
              )}

              {selectedSources[index] === "campaign" && (
                <div className="mb-2">
                  <h3 className="font-medium">Source Table {index + 1}</h3>
                  {isLoadingAllCampaigns ? (
                    <Input placeholder="Loading..." readOnly />
                  ) : isErrorAllCapaigns ? (
                    <Input placeholder="Error loading campaigns" readOnly />
                  ) : getAllCampaigns.length === 0 ? (
                    <Input placeholder="No campaigns found" readOnly />
                  ) : (
                    <SelectBox
                      items={formattedCampaigns}
                      selectLabel={`Source Table ${index + 1}:`}
                      placeholderText="Select the source to display in the chart..."
                      onChange={(value) => {
                        setSelectedSourcesTable((prev) => {
                          const updatedSources = [...prev];
                          updatedSources[index] = value;
                          return updatedSources;
                        });
                      }}
                      className="w-full mb-2"
                    ></SelectBox>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <hr className="ml-[-32px] w-[392px] border-gray-200 mt-2" />

      <div className="flex w-[360px] lg:w-full lg:gap-5 justify-between lg:mr-0 lg:justify-end">
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
      <Toaster />
    </div>
  );
}
