'use client';

import Link from 'next/link';
import { Menu, Building } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Icons } from '@/components/icons';
import { useState } from 'react';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '#about', label: 'Бидний тухай' },
  { href: '#services', label: 'Үйлчилгээ' },
  { href: '#projects', label: 'Төслүүд' },
  { href: '#news', label: 'Мэдээ' },
  { href: '#contact', label: 'Холбоо барих' },
];

export default function Header() {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Icons.Logo />
            <span className="hidden font-bold sm:inline-block font-headline">
              ABS Барилга
            </span>
          </Link>
        </div>

        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-2">
            <Button asChild className="hidden md:flex">
                <Link href="/admin/login">Админ нэвтрэх</Link>
            </Button>
            <Sheet open={isMobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" className="md:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Цэс</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <SheetHeader>
                   <SheetTitle className="sr-only">Үндсэн цэс</SheetTitle>
                   <SheetDescription className="sr-only">Сайтын үндсэн навигацийн холбоосууд.</SheetDescription>
                </SheetHeader>
                <div className="flex flex-col h-full py-6">
                  <Link href="/" className="mb-8 flex items-center" onClick={() => setMobileMenuOpen(false)}>
                    <Icons.Logo className="mr-2" />
                    <span className="font-bold font-headline">ABS Барилга</span>
                  </Link>
                  <div className="flex flex-col space-y-4 text-lg">
                    {navLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="text-foreground/80 hover:text-foreground"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                  <div className="mt-auto">
                    <Button asChild className="w-full">
                        <Link href="/admin/login">Админ нэвтрэх</Link>
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </nav>
        </div>
      </div>
    </header>
  );
}
