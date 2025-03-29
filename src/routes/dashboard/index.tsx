import { Paper } from '@/components/paper'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div className="w-full">
    <h1>Welcome to my appsdkgsfjngjsngknskgjndfknglksdfgkdsfngksdfhg</h1>
    <Paper/>
  </div> //teste
}
