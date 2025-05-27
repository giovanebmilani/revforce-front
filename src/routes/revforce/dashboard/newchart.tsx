import { createFileRoute } from "@tanstack/react-router";
import { ConfigureChart } from "@/components/ConfigureChart";

export const Route = createFileRoute("/revforce/dashboard/newchart")({
  component: RouteComponent,
});

function RouteComponent() {
  return (<ConfigureChart/>)
}
