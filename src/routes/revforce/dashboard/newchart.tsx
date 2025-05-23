import LabelInput from "@/components/LabelInput";
import { SelectBox } from "@/components/SelectBox";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import ChartSelect, { ChartType } from "@/components/ChartSelect";
import { CarouselSize } from "@/components/Carousel";
import { usePostNewChart } from "@/api/charts";
import { Plus } from "lucide-react";
import { useGetCampaigns } from "@/api/campaigns";
import { useGetAds } from "@/api/ads";
import { Input } from "@/components/ui/input";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/revforce/dashboard/newchart")({
  component: RouteComponent,
});

type MetricType = "ctr" | "click" | "impression" | "spend";
type SourceType = "campaign" | "ad";
type PeriodType = "hour" | "day" | "week" | "month";

interface SourceResponse {
  source_table: SourceType;
  source_id: string;
}

function RouteComponent() {
  const [name, setName] = useState("");
  const [selectedChart, setSelectedChart] = useState<ChartType | undefined>();
  const [selectedMetric, setSelectedMetric] = useState<
    MetricType | undefined | string
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
  const [selectedSourcesTable, setSelectedSourcesTable] = useState<
    SourceType[] | string[]
  >([]);
  const [selectedSources, setSelectedSources] = useState<string[]>([]);
  const [sourceClick, setSourceClick] = useState(0);

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

  const { mutateAsync: postNewChart, isPending: isPostNewChartPending } =
    usePostNewChart();

  const {
    data: getAllCampaigns,
    isLoading: isLoadingAllCampaigns,
    isError: isErrorAllCapaigns,
  } = useGetCampaigns();

  const {
    data: getAllAds,
    isLoading: isLoadingAllAds,
    isError: isErrorAllAds,
  } = useGetAds();

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

  const handleCreateChart = async () => {
    if (!name) {
      toast.error("Erro ao criar gráfico", {
        description: (
          <span className="text-red-500">
            Por favor, insira um nome para o gráfico.
          </span>
        ),
      });
      return;
    }
    if (!selectedChart) {
      toast.error("Erro ao criar gráfico", {
        description: (
          <span className="text-red-500">
            Por favor, selecione um tipo de gráfico.
          </span>
        ),
      });
      return;
    }
    if (!selectedMetric) {
      toast.error("Erro ao criar gráfico", {
        description: (
          <span className="text-red-500">
            Por favor, selecione uma métrica.
          </span>
        ),
      });
      return;
    }
    if (!selectedPeriodType) {
      toast.error("Erro ao criar gráfico", {
        description: (
          <span className="text-red-500">
            Por favor, selecione um tipo de período.
          </span>
        ),
      });
      return;
    }
    if (!selectedPeriodAmount) {
      toast.error("Erro ao criar gráfico", {
        description: (
          <span className="text-red-500">
            Por favor, insira um valor para o período.
          </span>
        ),
      });
      return;
    }
    if (!selectedGranularityType && selectedChart !== ChartType.pizza) {
      toast.error("Erro ao criar gráfico", {
        description: (
          <span className="text-red-500">
            Por favor, selecione um tipo de granularidade.
          </span>
        ),
      });
      return;
    }
    if (!selectedGranularityAmount && selectedChart !== ChartType.pizza) {
      toast.error("Erro ao criar gráfico", {
        description: (
          <span className="text-red-500">
            Por favor, insira um valor para a granularidade.
          </span>
        ),
      });
      return;
    }
    if (selectedSources.length === 0) {
      toast.error("Erro ao criar gráfico", {
        description: (
          <span className="text-red-500">
            Por favor, selecione ao menos uma fonte de dados.
          </span>
        ),
      });
      return;
    }
    if (selectedSourcesTable.length === 0) {
      toast.error("Erro ao criar gráfico", {
        description: (
          <span className="text-red-500">
            Por favor, selecione ao menos uma tabela de fonte.
          </span>
        ),
      });
      return;
    }
    if (selectedSources.length !== selectedSourcesTable.length) {
      toast.error("Erro ao criar gráfico", {
        description: (
          <span className="text-red-500">
            Por favor, selecione uma tabela de fonte para cada fonte.
          </span>
        ),
      });
      return;
    }
    if (
      selectedSourcesTable.filter((source) => source === undefined).length > 0
    ) {
      toast.error("Erro ao criar gráfico", {
        description: (
          <span className="text-red-500">
            Por favor, selecione uma tabela de fonte para cada fonte.
          </span>
        ),
      });
      return;
    }

    const granularityTypeToSend =
      selectedChart === ChartType.pizza
        ? selectedPeriodType
        : selectedGranularityType;
    const granularityAmountToSend =
      selectedChart === ChartType.pizza
        ? selectedPeriodAmount
        : selectedGranularityAmount;

    try {
      await postNewChart({
        account_id: localStorage.getItem("account_id") || "",
        name: name,
        type: selectedChart,
        metric: selectedMetric as MetricType,
        period: {
          type: selectedPeriodType as PeriodType,
          amount: Number(selectedPeriodAmount),
        },
        granularity: {
          type: granularityTypeToSend as PeriodType,
          amount: Number(granularityAmountToSend),
        },
        sources: createSource() as SourceResponse[],
        segment: null,
      });

      setName("");
      setSelectedChart(undefined);
      setSelectedMetric("");
      setSelectedPeriodType("");
      setSelectedPeriodAmount("");
      setSelectedGranularityType("");
      setSelectedGranularityAmount("");
      setSelectedSources([]);
      setSelectedSourcesTable([]);
      setSourceClick(0);
      toast.success("Gráfico criado com sucesso!");
    } catch (error: any) {
      toast.error("Erro ao criar gráfico", {
        description: <span className="text-red-500">{error.message}</span>,
      });
    }
  };

  return (
    <div className="flex flex-col w-full gap-3 px-4">
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
        <div className="flex-1 px-2 py-2">
          <CarouselSize children={charts}></CarouselSize>
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
          value={selectedMetric}
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
          value={selectedPeriodType}
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
            value={selectedGranularityType}
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
        <div className="flex items-center gap-2">
          <h3 className="font-medium">Adicionar dados no gráfico</h3>
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
              <h3 className="font-medium">Fonte do gráfico {index + 1}</h3>
              <SelectBox
                items={[
                  { value: "campaign", label: "Campanha" },
                  { value: "ad", label: "Anúncio" },
                ]}
                selectLabel={`Fonte ${index + 1}:`}
                placeholderText="Selecione a fonte para exibir no gráfico..."
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
                  <h3 className="font-medium">Tabela de fonte {index + 1}</h3>
                  {isLoadingAllAds ? (
                    <Input placeholder="Carregando..." readOnly />
                  ) : isErrorAllAds ? (
                    <Input placeholder="Erro carregando anúncios..." readOnly />
                  ) : getAllAds?.length === 0 ? (
                    <Input placeholder="Nenhum anúncio encontrado!" readOnly />
                  ) : (
                    <SelectBox
                      items={formattedAds || []}
                      selectLabel={`Tabela de fonte ${index + 1}:`}
                      placeholderText="Selecione a fonte para exibir no gráfico..."
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
                  <h3 className="font-medium">Tabela de fonte {index + 1}</h3>
                  {isLoadingAllCampaigns ? (
                    <Input placeholder="Carregando..." readOnly />
                  ) : isErrorAllCapaigns ? (
                    <Input placeholder="Erro carregando campanhas..." readOnly />
                  ) : getAllCampaigns?.length === 0 ? (
                    <Input placeholder="Nenhuma campanha encontrada!" readOnly />
                  ) : (
                    <SelectBox
                      items={formattedCampaigns || []}
                      selectLabel={`Tabela de fonte ${index + 1}:`}
                      placeholderText="Selecione a fonte para exibir no gráfico..."
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

      <div className="flex w-[360px] lg:w-full lg:gap-5 justify-center lg:mr-0 lg:justify-end">
        <Button
          variant={"pointer"}
          onClick={handleCreateChart}
          disabled={isPostNewChartPending}
          className="w-40"
        >
          Criar Gráfico
        </Button>
      </div>
      <Toaster />
    </div>
  );
}
