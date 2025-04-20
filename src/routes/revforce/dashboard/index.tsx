import { Button } from "@/components/ui/button";
import { useRefreshMutation, useRefreshTime } from "@/hooks/useRefresh";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/revforce/dashboard/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { data } = useRefreshTime("ed3e69fd-19aa-4187-9942-edba27d18e6b");
  console.log(data);
  const { mutate } = useRefreshMutation("ed3e69fd-19aa-4187-9942-edba27d18e6b");

  return (
    <div>
       <Button onClick={() => mutate()}>TESTE</Button>
    </div>
  );
}
