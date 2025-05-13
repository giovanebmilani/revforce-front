import LabelInput from "@/components/LabelInput";
import { SelectBox } from "@/components/SelectBox";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { CarouselSize } from "@/components/Carousel";
import { useGetCampaigns } from "@/api/campaigns";
import { useGetAds } from "@/api/ads";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import {
  ChartSegment,
  PeriodType,
  SourceTable,
  usePostNewChart,
} from "@/api/charts";
import ChartSelect, {
  ChartType,
  ChartTypeData,
} from "@/components/ChartSelect";

export const Route = createFileRoute("/revforce/dashboard/newchart")({
  component: RouteComponent,
});

type MetricType = "ctr" | "click" | "impression" | "spend";
type SourceType = "campaign" | "ad";

function RouteComponent() {
  const charts = [
    <ChartSelect
      onClick={() => setSelectedChart(ChartType.barVertical)}
      key={ChartType.barVertical}
      type={ChartType.barVertical}
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
  ];

  const [name, setName] = useState("");
  const [selectedChart, setSelectedChart] = useState<ChartType | undefined>();
  const [selectedMetric, setSelectedMetric] = useState<
    MetricType | undefined
  >();
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
  const [selectedSegment, setSelectedSegment] = useState<ChartSegment | string>(
    ""
  );
  const [selectedCampaignId, setSelectedCampaignId] = useState<string>("");
  const [selectedAdId, setSelectedAdId] = useState<string>("");
  const { data: campaignsData } = useGetCampaigns();
  const { data: adsData } = useGetAds();

  const { mutate: postNewChart, isPending, isSuccess } = usePostNewChart();

  const verifyField = () => {
    const result = !(
      name &&
      selectedChart &&
      selectedMetric &&
      selectedPeriodType &&
      selectedPeriodAmount &&
      selectedSource &&
      ((selectedSource === "campaign" && selectedCampaignId) ||
        (selectedSource === "ad" && selectedAdId)) &&
      (selectedChart === ChartType.pizza ||
        (selectedGranularityType && selectedGranularityAmount))
    );
    return result;
  };

  const handleCreateChart = () => {
    postNewChart(
      {
        name,
        type: selectedChart!,
        metric: selectedMetric!,
        period: {
          type: selectedPeriodType as PeriodType,
          amount: Number(selectedPeriodAmount),
        },
        granularity: {
          type: selectedGranularityType as PeriodType,
          amount: Number(selectedGranularityAmount),
        },
        sources: [
          {
            source_table: selectedSource as SourceTable,
            source_id:
              selectedSource === "campaign" ? selectedCampaignId : selectedAdId,
          },
        ],
        segment: selectedSegment as ChartSegment,
        account_id: localStorage.getItem("account_id")!,
      },
      {
        onError: (error) =>
          console.error("Erro ao criar gráfico:", error.message),
      }
    );
  };

  return (
    <div className="flex flex-col w-full gap-3">
      <h2 className="text-gray-300">Dashboard /</h2>
      <h1 className="text-2xl font-semibold italic mb-3">Novo Gráfico</h1>
      <hr className="ml-[-32px] max-w-screen border-gray-200 mb-2" />

      <div className="w-[360px]">
        <LabelInput
          inputTitle="Nome:"
          props={{
            placeholder: "Nome",
            value: name,
            onChange: (e) => setName(e.target.value),
            required: true,
          }}
        ></LabelInput>
      </div>

      <section className="flex flex-col w-fit rounded-sm border-1">
        <h2 className="font-semibold p-4">Gráficos</h2>
        <hr className="border-1" />
        <div className="flex-1 px-4 py-4">
          <CarouselSize children={charts}></CarouselSize>
        </div>
        <div className="flex px-4 pb-4 gap-2">
          <h3 className="font-semibold">Selecionado:</h3>
          <p>{ChartTypeData[selectedChart as ChartType]?.label}</p>
        </div>
      </section>

      <div className="w-[360px]">
        <h3 className="font-medium">Métrica do Gráfico:</h3>
        <SelectBox
          items={[
            { value: "ctr", label: "CTR" },
            { value: "click", label: "Cliques" },
            { value: "impression", label: "Impressões" },
            { value: "spend", label: "Investimento" },
          ]}
          selectLabel="Métrica do Gráfico"
          placeholderText="Selecione a métrica para exibir no gráfico..."
          onChange={setSelectedMetric}
          className="w-full"
        ></SelectBox>
      </div>

      <hr className="ml-[-32px] w-[392px] border-gray-200 mt-2" />

      <div className="w-[360px]">
        <h3 className="font-medium">Período do Gráfico:</h3>

        <h3 className="font-medium mt-2">Tipo</h3>
        <SelectBox
          items={[
            { value: "hour", label: "Hora" },
            { value: "day", label: "Dia" },
            { value: "week", label: "Semana" },
            { value: "month", label: "Mês" },
          ]}
          selectLabel="Período do Gráfico"
          placeholderText="Selecione o período para exibir no gráfico..."
          onChange={setSelectedPeriodType}
          className="w-full mb-2"
        ></SelectBox>

        <LabelInput
          inputTitle="Quantidade"
          props={{
            type: "number",
            min: 1,
            placeholder: "Quantidade do Período",
            value: selectedPeriodAmount,
            onChange: (e) => setSelectedPeriodAmount(e.target.value),
          }}
        ></LabelInput>
      </div>

      <hr className="ml-[-32px] w-[392px] border-gray-200 mt-2" />

      {selectedChart !== ChartType.pizza && (
        <div className="w-[360px]">
          <h3 className="font-medium">Granularidade do Gráfico:</h3>

          <h3 className="font-medium mt-2">Tipo</h3>
          <SelectBox
            items={[
              { value: "hour", label: "Hora" },
              { value: "day", label: "Dia" },
              { value: "week", label: "Semana" },
              { value: "month", label: "Mês" },
            ]}
            selectLabel="Granularidade do Gráfico"
            placeholderText="Selecione a granularidade para exibir no gráfico..."
            onChange={setSelectedGranularityType}
            className="w-full mb-2"
          ></SelectBox>

          <LabelInput
            inputTitle="Quantidade"
            props={{
              type: "number",
              min: 1,
              placeholder: "Quantidade do Período",
              value: selectedGranularityAmount,
              onChange: (e) => setSelectedGranularityAmount(e.target.value),
            }}
          ></LabelInput>

          <hr className="ml-[-32px] w-[392px] border-gray-200 mt-5" />
        </div>
      )}

      <div className="w-[360px]">
        <h3 className="font-medium">Fonte do Gráfico:</h3>
        <SelectBox
          items={[
            { value: "campaign", label: "Campanha" },
            { value: "ad", label: "Anúncio" },
          ]}
          selectLabel="Fonte do Gráfico:"
          placeholderText="Selecione a fonte para exibir no gráfico..."
          onChange={setSelectedSource}
          className="w-full"
        ></SelectBox>

        {selectedSource === "campaign" && (
          <div className="mt-2">
            <SelectBox
              items={
                campaignsData?.map((campaign) => ({
                  value: campaign.id,
                  label: campaign.name,
                })) || []
              }
              selectLabel="Selecionar Campanha:"
              placeholderText="Escolha uma campanha..."
              onChange={setSelectedCampaignId}
              className="w-full"
            />
          </div>
        )}

        {selectedSource === "ad" && (
          <div className="mt-2">
            <SelectBox
              items={
                adsData?.map((ad) => ({
                  value: ad.id,
                  label: ad.name,
                })) || []
              }
              selectLabel="Selecionar Anúncio:"
              placeholderText="Escolha um anúncio..."
              onChange={setSelectedAdId}
              className="w-full"
            />
          </div>
        )}
        <hr className="ml-[-32px] w-[392px] border-gray-200 mt-5" />
      </div>

      <div className="w-[360px]">
        <h3 className="font-medium">Segmento do Gráfico:</h3>
        <SelectBox
          items={[
            { value: "device", label: "Dispositivo" },
            { value: "date", label: "Data" },
          ]}
          selectLabel="Segmento do Gráfico:"
          placeholderText="Selecione o segmento para exibir no gráfico..."
          onChange={setSelectedSegment}
          className="w-full"
        ></SelectBox>
      </div>

      <div className="w-[360px] pt-3 pb-15">
        <Button
          variant={"pointer"}
          onClick={handleCreateChart}
          disabled={isPending || verifyField()}
        >
          Criar Gráfico
        </Button>
      </div>
      {isPending && (
        <div className="flex justify-center items-center w-full h-full">
          <p className="text-gray-500">Criando gráfico...</p>
          <Spinner />
        </div>
      )}
      {isSuccess && (
        <div className="flex justify-center items-center w-full h-full">
          <p className="text-green-500">Gráfico criado com sucesso!</p>
        </div>
      )}
    </div>
  );
}
