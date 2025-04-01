import LabelInput from '@/components/LabelInput';
import { Button } from '@/components/ui/button';
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/settings/')({
  component: RouteComponent,
})

const fontes = ["Google Ads", "Facebook Ads", "CRM"];

function RouteComponent() {
  return (
    <div className="p-6 max-w-4xl">
      <h1 className="text-2xl font-bold mb-6 text-foreground font">Configurações de integração</h1>
      <div className="grid gap-6">
        {fontes.map((source) => (
          <div key={source} className="p-4">
            <h2 className="text-lg font-semibold mb-2 text-foreground">{source}</h2>
            <div className="grid grid-cols-2 gap-4">
            <LabelInput inputTitle="ID da Conta" props={{ className: "w-80 p-2 border border-input rounded-md bg-background text-foreground" }} />
            <LabelInput inputTitle="Chave de Acesso" props={{ className: "w-80 p-2 border border-input rounded-md bg-background text-foreground" }} />
            </div>
            <Button className="mt-4 font-bold" variant="pointer">SALVAR</Button>
          </div>
        ))}
      </div>
    </div>
  );
}
