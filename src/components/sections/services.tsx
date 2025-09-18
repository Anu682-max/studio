'use client';

import React, { useEffect, useState } from 'react';
import { getServices, type Service, iconMap } from '@/lib/data';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Building } from 'lucide-react';

export default function Services() {
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const fetchedServices = await getServices();
        setServices(fetchedServices);
      } catch (error) {
        console.error("Failed to fetch services:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchServices();
  }, []);

  const renderSkeleton = () => (
     Array.from({ length: 6 }).map((_, index) => (
        <Card key={`skeleton-${index}`} className="flex flex-col text-center items-center">
             <CardHeader>
                <div className="flex justify-center items-center mb-4">
                    <Skeleton className="h-16 w-16 rounded-full" />
                </div>
                <Skeleton className="h-6 w-32" />
            </CardHeader>
            <div className="px-6 pb-6 text-sm text-muted-foreground">
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-5/6" />
            </div>
        </Card>
     ))
  );

  return (
    <section id="services" className="bg-secondary">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-headline">Манай Үйлчилгээ</h2>
          <p className="mt-2 text-lg text-muted-foreground max-w-2xl mx-auto">
            Төсөөллөөс бодит байдал хүртэл. Бид таны алсын харааг бодит болгохын тулд барилгын иж бүрэн, мэргэжлийн үйлчилгээг санал болгож байна.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading ? renderSkeleton() : services.map((service, index) => {
            const Icon = (service.icon && iconMap[service.icon]) || Building;
            return (
               <Card key={service.id || index} className="flex flex-col text-center items-center hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className="flex justify-center items-center mb-4">
                    <div className="p-4 bg-accent/20 rounded-full">
                      <Icon className="h-8 w-8 text-accent" />
                    </div>
                  </div>
                  <CardTitle className="font-headline">{service.title}</CardTitle>
                </CardHeader>
                <CardDescription className="px-6 pb-6 text-base">
                  {service.description}
                </CardDescription>
              </Card>
            )
          })}
        </div>
         {!isLoading && services.length === 0 && (
          <div className="text-center p-8 text-muted-foreground">
              Үйлчилгээний мэдээлэл одоогоор байхгүй байна. Удирдлагын самбараас нэмнэ үү.
          </div>
        )}
      </div>
    </section>
  );
}
