'use client';

import Link from "next/link";
import {
  Building,
  Home,
  Newspaper,
  Settings,
  Construction,
  LogOut,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Icons } from "@/components/icons";
import { usePathname, useRouter } from "next/navigation";
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/lib/firebase/config';
import { signOut } from "firebase/auth";
import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, loading, error] = useAuthState(auth);
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = async () => {
    await signOut(auth);
    router.push('/admin/login');
  };

  if (loading) {
    return (
        <div className="flex min-h-screen w-full flex-col">
            <div className="flex flex-1">
                <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
                     <Skeleton className="h-full w-full" />
                </aside>
                <main className="flex-1 p-4 sm:pl-20">
                    <Skeleton className="h-32 w-full mb-4" />
                    <Skeleton className="h-[400px] w-full" />
                </main>
            </div>
        </div>
    );
  }

  if (error || !user) {
    if (typeof window !== 'undefined') {
       router.push('/admin/login');
    }
    return (
         <div className="flex min-h-screen items-center justify-center">
            <p>Уучлаарай, та нэвтрээгүй байна. Нэвтрэх хуудас руу шилжиж байна...</p>
        </div>
    );
  }

  const navItems = [
    { href: "/admin/dashboard", icon: Home, label: "Хяналтын самбар" },
    { href: "/admin/dashboard/projects", icon: Building, label: "Төслүүд" },
    { href: "/admin/dashboard/services", icon: Construction, label: "Үйлчилгээ" },
    { href: "/admin/dashboard/news", icon: Newspaper, label: "Мэдээ" },
  ];

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
        <TooltipProvider>
          <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
            <Link
              href="/"
              className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
            >
              <Icons.Logo className="h-5 w-5 transition-all group-hover:scale-110" />
              <span className="sr-only">ABS Барилга</span>
            </Link>
            {navItems.map((item) => (
               <Tooltip key={item.href}>
                <TooltipTrigger asChild>
                  <Link
                    href={item.href}
                    className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors hover:text-foreground md:h-8 md:w-8 ${pathname === item.href ? 'bg-accent text-accent-foreground' : 'text-muted-foreground'}`}
                  >
                    <item.icon className="h-5 w-5" />
                    <span className="sr-only">{item.label}</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right">{item.label}</TooltipContent>
              </Tooltip>
            ))}
          </nav>
          <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleLogout}
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                >
                  <LogOut className="h-5 w-5" />
                  <span className="sr-only">Гарах</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">Гарах</TooltipContent>
            </Tooltip>
          </nav>
        </TooltipProvider>
      </aside>
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
            {children}
        </main>
      </div>
    </div>
  );
}
