import Image from 'next/image';
import { news } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function News() {
  return (
    <section id="news" className="bg-secondary">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-headline">Сүүлийн үеийн мэдээ</h2>
          <p className="mt-2 text-lg text-muted-foreground max-w-2xl mx-auto">
            Манай компанийн сүүлийн үеийн үйл явдал, салбарын мэдээллээс хоцролгүй танилцаарай.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {news.map((article) => {
            const image = PlaceHolderImages.find(p => p.id === article.imagePlaceholderId);
            return (
              <Card key={article.id} className="flex flex-col overflow-hidden">
                {image && (
                  <div className="relative aspect-[4/3] w-full">
                    <Image
                      src={image.imageUrl}
                      alt={image.description}
                      fill
                      className="object-cover"
                      data-ai-hint={image.imageHint}
                    />
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="font-headline text-lg">{article.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">{new Date(article.date).toLocaleDateString('mn-MN', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                </CardHeader>
                <CardContent className="flex-grow">
                  <CardDescription>{article.summary}</CardDescription>
                </CardContent>
                <div className="p-6 pt-0">
                  <Button variant="link" asChild className="p-0 h-auto">
                    <Link href="#">Дэлгэрэнгүй</Link>
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
