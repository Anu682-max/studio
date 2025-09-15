"use client";

import * as React from "react";
import Image from "next/image";
import { MoreHorizontal, PlusCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { news as initialNews, type NewsArticle } from "@/lib/data";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export default function NewsPage() {
  const [news, setNews] = React.useState<NewsArticle[]>(initialNews);
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [currentArticle, setCurrentArticle] = React.useState<NewsArticle | null>(null);

  const handleAddArticle = () => {
    setCurrentArticle(null);
    setIsDialogOpen(true);
  };

  const handleEditArticle = (article: NewsArticle) => {
    setCurrentArticle(article);
    setIsDialogOpen(true);
  };

  const handleDeleteArticle = (articleId: string) => {
    setNews(news.filter((a) => a.id !== articleId));
  };
  
  const handleSaveArticle = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newArticle: NewsArticle = {
      id: currentArticle?.id || `n${Date.now()}`,
      title: formData.get("title") as string,
      date: new Date(formData.get("date") as string).toISOString(),
      summary: formData.get("summary") as string,
      imagePlaceholderId: 'news-1', // Default or select
    };

    if (currentArticle) {
      setNews(news.map((a) => (a.id === currentArticle.id ? newArticle : a)));
    } else {
      setNews([newArticle, ...news]);
    }
    setIsDialogOpen(false);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
            <div>
                <CardTitle>Мэдээний нийтлэл</CardTitle>
                <CardDescription>
                    Компанийнхаа мэдээ, зарлалыг удирдах.
                </CardDescription>
            </div>
            <Button size="sm" className="gap-1" onClick={handleAddArticle}>
                <PlusCircle className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Нийтлэл нэмэх
                </span>
            </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Гарчиг</TableHead>
              <TableHead>Огноо</TableHead>
              <TableHead>
                <span className="sr-only">Үйлдлүүд</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {news.map((article) => (
              <TableRow key={article.id}>
                <TableCell className="font-medium">{article.title}</TableCell>
                <TableCell>{new Date(article.date).toLocaleDateString()}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button aria-haspopup="true" size="icon" variant="ghost">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Цэс</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Үйлдлүүд</DropdownMenuLabel>
                      <DropdownMenuItem onClick={() => handleEditArticle(article)}>Засах</DropdownMenuItem>
                       <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>Устгах</DropdownMenuItem>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Та итгэлтэй байна уу?</AlertDialogTitle>
                              <AlertDialogDescription>
                                Энэ үйлдлийг буцаах боломжгүй. Энэ нь нийтлэлийг бүрмөсөн устгах болно.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Цуцлах</AlertDialogCancel>
                              <AlertDialogAction onClick={() => handleDeleteArticle(article.id)}>Үргэлжлүүлэх</AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        <div className="text-xs text-muted-foreground">
          Нийт <strong>{news.length}</strong> нийтлэлээс <strong>1-{news.length}</strong>-г харуулж байна
        </div>
      </CardFooter>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <form onSubmit={handleSaveArticle}>
            <DialogHeader>
              <DialogTitle>{currentArticle ? 'Нийтлэл засах' : 'Нийтлэл нэмэх'}</DialogTitle>
              <DialogDescription>
                {currentArticle ? 'Энэ нийтлэлийн мэдээллийг шинэчлэх.' : 'Шинэ нийтлэл нэмэх.'}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="title" className="text-right">
                  Гарчиг
                </Label>
                <Input id="title" name="title" defaultValue={currentArticle?.title} className="col-span-3" required/>
              </div>
               <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="date" className="text-right">
                  Огноо
                </Label>
                <Input type="date" id="date" name="date" defaultValue={currentArticle?.date.split('T')[0]} className="col-span-3" required/>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="summary" className="text-right">
                  Товч
                </Label>
                <Textarea id="summary" name="summary" defaultValue={currentArticle?.summary} className="col-span-3" required/>
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>Цуцлах</Button>
              <Button type="submit">Хадгалах</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </Card>
  );
}
