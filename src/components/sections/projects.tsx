import Image from 'next/image';
import { projects } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Badge } from '@/components/ui/badge';

export default function Projects() {
  return (
    <section id="projects" className="container">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold font-headline">Онцлох төслүүд</h2>
        <p className="mt-2 text-lg text-muted-foreground max-w-2xl mx-auto">
          Бидний амжилттай хэрэгжүүлсэн төслүүдийн багцаас.
        </p>
      </div>

      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent>
          {projects.map((project) => {
            const image = PlaceHolderImages.find(p => p.id === project.imagePlaceholderId);
            return (
              <CarouselItem key={project.id} className="md:basis-1/2 lg:basis-1/3">
                <div className="p-1">
                  <Card className="overflow-hidden group">
                    <CardContent className="p-0">
                      <div className="relative aspect-[3/2] w-full overflow-hidden">
                        {image && (
                          <Image
                            src={image.imageUrl}
                            alt={image.description}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                            data-ai-hint={image.imageHint}
                          />
                        )}
                      </div>
                      <div className="p-4 bg-card">
                        <h3 className="font-semibold text-lg font-headline">{project.title}</h3>
                        <Badge variant="secondary" className="mt-2">{project.category}</Badge>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious className="hidden md:inline-flex" />
        <CarouselNext className="hidden md:inline-flex" />
      </Carousel>
    </section>
  );
}
