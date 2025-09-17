import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Phone } from 'lucide-react';

export default function Hero() {
  const heroImage = PlaceHolderImages.find(p => p.id === 'hero-1');

  return (
    <section className="relative h-[calc(100vh-4rem)] w-full flex items-center justify-center p-0">
      {heroImage && (
        <Image
          src={heroImage.imageUrl}
          alt={heroImage.description}
          fill
          className="object-cover"
          priority
          data-ai-hint={heroImage.imageHint}
        />
      )}
      <div className="absolute inset-0 bg-primary/40" />
      <div className="relative z-10 text-center text-primary-foreground p-4">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight font-headline drop-shadow-md">
          Барилга бүрд төгс гүйцэтгэл
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl drop-shadow-sm">
          ABS Барилга нь зураг төслөөс эхлэн гүйцэтгэл хүртэлх бүх үе шатанд хосгүй чанар, ур чадварыг төсөл бүрт хүргэдэг.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Button size="lg" asChild>
            <Link href="#projects">Манай төслүүд</Link>
          </Button>
          <Button size="lg" variant="outline" asChild className="bg-transparent hover:bg-white/10 border-white text-white hover:text-white">
            <Link href="#contact">
              <Phone className="mr-2 h-5 w-5" />
              Холбоо барих
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
