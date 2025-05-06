import { saveIntegrationSettings } from "@/api/account.config";
import LabelInput from "@/components/LabelInput";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/revforce/settings/")({
  component: RouteComponent,
});

const fontes = ["Google Ads", "Facebook Ads", "CRM"];

function RouteComponent() {
  interface Settings {
    account_id: string;
    api_secret: string;
    type: string;
  }

  const { isSuccess, mutate, isError, error } = useMutation({
    mutationFn: async (settings: Settings) => {
      const { account_id, api_secret, type } = settings;
      localStorage.setItem("account_id", account_id);
      return await saveIntegrationSettings(account_id, api_secret, type);
    },
    onSuccess: (data) => {
      console.log("Settings saved successfully: ", data);
    }
  })

  const [settings, setSettings] = useState<Record<string,Settings>>({
    "Google Ads": {
      account_id: "",
      api_secret: "",
      type: "google_ads",
    },
    "Facebook Ads": {
      account_id: "",
      api_secret: "",
      type: "facebook_ads",
    },
    "CRM": {
      account_id: "",
      api_secret: "",
      type: "crm",
    },
  });

  const handleInputChange = (
    source: string,
    field: keyof Settings,
    value: string
  ) => {
    setSettings((prevSettings) => ({
      ...prevSettings,
      [source]: {
        ...prevSettings[source],
        [field]: value,
      },
    }));
  };

  return (
    <div className="p-6 max-w-4xl">
      <h1 className="text-2xl font-bold mb-6 text-foreground font">
        Configurações de integração
      </h1>
      {isSuccess && (
        <div className="text-green-500 mt-2">
          Configurações salvas com sucesso!
        </div>
      )}
      {isError && (
        <div className="text-red-500 mt-2">
          Erro ao salvar configurações.
          {" " + error.message}
        </div>
      )}
      <div className="grid gap-6">
        {fontes.map((source) => (
          <div key={source} className="p-4">
            <h2 className="text-lg font-semibold mb-2 text-foreground">
              {source}
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <LabelInput
                inputTitle="ID da Conta"
                props={{
                  className:
                    "w-80 p-2 border border-input rounded-md bg-background text-foreground",
                  onChange: (e) =>
                    handleInputChange(source, "account_id", e.target.value),
                }}
              />
              <LabelInput
                inputTitle="Chave de Acesso"
                props={{
                  className:
                    "w-80 p-2 border border-input rounded-md bg-background text-foreground",
                  onChange: (e) =>
                    handleInputChange(source, "api_secret", e.target.value),
                }}
              />
            </div>
            <Button
              className="mt-4 font-bold"
              variant="pointer"
              onClick={() => mutate(settings[source])}
            >
              SALVAR
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
