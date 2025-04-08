import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/revforce/dashboard/chartdetails/$chartId')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/dashboard/chartdetails/$chartId"!</div>
}
