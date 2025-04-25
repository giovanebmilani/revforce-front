import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute("/revforce/dashboard/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <Link to="/revforce/dashboard/newchart">Hello "/dashboard"!</Link>
}
 