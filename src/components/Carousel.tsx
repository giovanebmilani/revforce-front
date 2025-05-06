import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export function CarouselSize({
  children,
  cardsShownAmount,
}: {
  children: React.ReactNode[];
  cardsShownAmount?: number;
}) {
  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="max-w-[350px] lg:max-w-[600px]"
    >
      <CarouselContent className="h-fit">
        {children.map((child, index) => (
          <CarouselItem
            key={index}
            className={`basis-1/2 md:basis-1/2 lg:basis-1/${cardsShownAmount || 3} w-full h-full`}
          >
            <div>
              <Card className='min-h-full p-1 border-0 shadow-none'>
                <CardContent className="flex items-center justify-center p-0 hover:cursor-pointer hover:scale-103 transition duration-200 ease-in-out">
                  {child}
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
