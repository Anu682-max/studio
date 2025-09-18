import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent } from '@/components/ui/card';
import { Check } from 'lucide-react';

export default function About() {
  const aboutImage = PlaceHolderImages.find(p => p.id === 'about-1');

  return (
    <section id="about" className="container">
      <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
        <div className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-lg">
          {aboutImage && (
            <Image
              src={aboutImage.imageUrl}
              alt={aboutImage.description}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              data-ai-hint={aboutImage.imageHint}
            />
          )}
        </div>
        <div>
          <h2 className="text-3xl md:text-4xl font-bold font-headline mb-4">
            Итгэлцэлд суурилсан бүтээн байгуулалт
          </h2>
          <p className="text-muted-foreground mb-6">
            ABS Барилга нь хорь гаруй жилийн турш барилгын салбарын тулгын чулуу болж, цаг хугацааны шалгуурыг даасан төслүүдийг хэрэгжүүлсээр ирсэн. Бидний эрхэм зорилго бол үнэнч шударга, нарийн нямбай, үйлчлүүлэгчдийнхээ алсын харааг гүнзгий ойлгож бүтээн байгуулах явдал юм. Бид зөвхөн ашиглахад тохиромжтой төдийгүй урам зориг өгөх орон зайг бий болгоно гэдэгт итгэдэг.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-center">
              <Check className="h-5 w-5 text-primary mr-3 shrink-0" />
              <span className="font-semibold">Тогтвортой чанар</span>
            </div>
            <div className="flex items-center">
              <Check className="h-5 w-5 text-primary mr-3 shrink-0" />
              <span className="font-semibold">Үйлчлүүлэгч төвтэй хандлага</span>
            </div>
            <div className="flex items-center">
              <Check className="h-5 w-5 text-primary mr-3 shrink-0" />
              <span className="font-semibold">Тогтвортой хөгжлийн практик</span>
            </div>
            <div className="flex items-center">
              <Check className="h-5 w-5 text-primary mr-3 shrink-0" />
              <span className="font-semibold">Цаг хугацаандаа хүлээлгэн өгөх</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
