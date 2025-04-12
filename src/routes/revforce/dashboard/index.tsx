import { CarouselSize } from '@/components/Carousel'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/revforce/dashboard/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div className="w-full">
    <h1>la vida</h1>
    <CarouselSize />
  </div> //teste
}
