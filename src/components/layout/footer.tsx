import Link from 'next/link';
import { Icons } from '@/components/icons';
import { Mail, MapPin, Phone } from 'lucide-react';

const navLinks = [
  { href: '#about', label: 'Бидний тухай' },
  { href: '#services', label: 'Үйлчилгээ' },
  { href: '#projects', label: 'Төслүүд' },
  { href: '#news', label: 'Мэдээ' },
];

export default function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <Icons.Logo />
              <span className="font-bold text-xl font-headline">ABS Барилга</span>
            </Link>
            <p className="text-sm text-muted-foreground pr-4">
              Ирээдүйг бүтээж, өнгөрснийг сэргээнэ. Төсөл бүрт чанар, үнэнч шударга байдал, шилдэг гүйцэтгэлийг эрхэмлэнэ.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4 font-headline">Хэрэгцээт холбоос</h3>
            <ul className="space-y-2">
              {navLinks.map(link => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-foreground">
                    {link.label}
                  </Link>
                </li>
              ))}
               <li>
                  <Link href="#contact" className="text-sm text-muted-foreground hover:text-foreground">
                    Холбоо барих
                  </Link>
                </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 font-headline">Холбоо барих мэдээлэл</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start">
                <MapPin className="w-4 h-4 mr-3 mt-1 shrink-0" />
                <span className="text-muted-foreground">123 Барилгын гудамж, Метрополис, 10101</span>
              </li>
              <li className="flex items-center">
                <Phone className="w-4 h-4 mr-3 shrink-0" />
                <a href="tel:+1234567890" className="text-muted-foreground hover:text-foreground">(123) 456-7890</a>
              </li>
              <li className="flex items-center">
                <Mail className="w-4 h-4 mr-3 shrink-0" />
                <a href="mailto:contact@absbuild.com" className="text-muted-foreground hover:text-foreground">contact@absbuild.com</a>
              </li>
            </ul>
          </div>
          
          <div>
             <h3 className="font-semibold mb-4 font-headline">Ажиллах цагийн хуваарь</h3>
              <p className="text-sm text-muted-foreground">Даваа - Баасан: 8:00 - 18:00</p>
              <p className="text-sm text-muted-foreground">Бямба: 9:00 - 13:00</p>
              <p className="text-sm text-muted-foreground">Ням: Амарна</p>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border/50 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} ABS Барилга. Бүх эрх хуулиар хамгаалагдсан.</p>
        </div>
      </div>
    </footer>
  );
}
