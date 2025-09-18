'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { getNews, type NewsArticle } from '@/lib/data';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Skeleton } from '@/components/ui/skeleton';


export default function News() {
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const fetchedNews = await getNews();
        setNews(fetchedNews);
      } catch (error) {
        console.error("Failed to fetch news:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchNews();
  }, []);

  const renderSkeleton = () => (
    Array.from({ length: 3 }).map((_, index) => (
      <Card key={`skeleton-${index}`} className="flex flex-col overflow-hidden">
         <Skeleton className="aspect-[4/3] w-full" />
        <CardHeader>
          <Skeleton className="h-5 w-4/5 mb-2" />
          <Skeleton className="h-4 w-1/3" />
        </CardHeader>
        <CardContent className="flex-grow">
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-2/3" />
        </CardContent>
        <div className="p-6 pt-0">
           <Skeleton className="h-5 w-20" />
        </div>
      </Card>
    ))
  )

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
          {isLoading ? renderSkeleton() : news.map((article) => {
            return (
              <Card key={article.id} className="flex flex-col overflow-hidden">
                {article.imageUrl && (
                  <div className="relative aspect-[4/3] w-full">
                    <Image
                      src={article.imageUrl}
                      alt={article.title}
                      fill
                      className="object-cover"
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
        {!isLoading && news.length === 0 && (
          <div className="text-center p-8 text-muted-foreground">
              Сүүлийн үеийн мэдээ одоогоор байхгүй байна.
          </div>
        )}
      </div>
    </section>
  );
}
