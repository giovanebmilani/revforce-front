import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/revforce/dashboard/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/dashboard/"!</div>
}
