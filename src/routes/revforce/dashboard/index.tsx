import IconButton from '@/components/IconButton'
import { Button } from '@/components/ui/button'
import { createFileRoute } from '@tanstack/react-router'
import { Icon, icons, Plus } from 'lucide-react'

export const Route = createFileRoute('/revforce/dashboard/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div className='w-full h-full flex flex-row justify-end'>
    <h1 className='text-3xl font-bold'>Dashboard</h1>
    <div className='w-3/4'> </div> {/* pra separar o dashboard do resto (chinelagem, ajude ages 3) */}
    <div className='flex flex-row gap-2 items-center'>
      <IconButton icon={icons.RefreshCcw} />
      <Button className='text-white'>
        <Plus /> New Chart
      </Button>
    </div>
  </div>
}
