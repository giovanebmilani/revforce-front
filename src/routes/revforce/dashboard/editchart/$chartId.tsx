import { createFileRoute } from "@tanstack/react-router";
import { ConfigureChart } from "@/components/ConfigureChart";

export const Route = createFileRoute("/revforce/dashboard/editchart/$chartId")({
  component: RouteComponent,
});

function RouteComponent() {
  const { chartId } = Route.useParams();
  
  return (
    <ConfigureChart
      chartId={chartId}
    />
)
}
