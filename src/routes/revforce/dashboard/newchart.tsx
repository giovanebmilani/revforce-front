import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/revforce/dashboard/newchart')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/dashboard/newchart"!</div>
}
