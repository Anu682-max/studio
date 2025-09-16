'use client';

import Link from "next/link";
import { Building, Construction, Newspaper } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import React, { useEffect, useState } from "react";
import { getProjects, getServices, getNews } from "@/lib/data";

export default function Dashboard() {
  const [projectCount, setProjectCount] = useState(0);
  const [serviceCount, setServiceCount] = useState(0);
  const [newsCount, setNewsCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      try {
        const [projects, services, news] = await Promise.all([
          getProjects(),
          getServices(),
          getNews(),
        ]);
        setProjectCount(projects.length);
        setServiceCount(services.length);
        setNewsCount(news.length);
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  const renderStatCard = (title: string, value: number, icon: React.ReactNode, description: string) => (
     <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{title}</CardTitle>
            {icon}
        </CardHeader>
        <CardContent>
            {isLoading ? (
                 <Skeleton className="h-8 w-12" />
            ) : (
                <div className="text-2xl font-bold">{value}</div>
            )}
            <p className="text-xs text-muted-foreground">
              {description}
            </p>
        </CardContent>
    </Card>
  )

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-headline font-semibold">ABS Барилга Хяналтын самбарт тавтай морил</h1>
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
       {renderStatCard("Нийт төсөл", projectCount, <Building className="h-4 w-4 text-muted-foreground" />, "танилцуулсан төслүүд")}
       {renderStatCard("Санал болгож буй үйлчилгээ", serviceCount, <Construction className="h-4 w-4 text-muted-foreground" />, "бүртгэгдсэн үйлчилгээ")}
       {renderStatCard("Мэдээний нийтлэл", newsCount, <Newspaper className="h-4 w-4 text-muted-foreground" />, "нийтлэгдсэн нийтлэл")}
      </div>
      <Card>
        <CardHeader>
            <CardTitle className="font-headline">Шуурхай үйлдэл</CardTitle>
            <CardDescription>Контент удирдлагын хэсгүүд рүү хурдан шилжих.</CardDescription>
        </CardHeader>
        <CardContent className="grid sm:grid-cols-3 gap-4">
            <Link href="/admin/dashboard/projects">
                <Button className="w-full" variant="outline">Төсөл удирдах</Button>
            </Link>
             <Link href="/admin/dashboard/services">
                <Button className="w-full" variant="outline">Үйлчилгээ удирдах</Button>
            </Link>
             <Link href="/admin/dashboard/news">
                <Button className="w-full" variant="outline">Мэдээ удирдах</Button>
            </Link>
        </CardContent>
       </Card>
    </div>
  );
}
