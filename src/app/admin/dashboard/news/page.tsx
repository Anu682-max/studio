'use client';

import * as React from 'react';
import { MoreHorizontal, PlusCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Skeleton } from '@/components/ui/skeleton';

import {
  getNews,
  addNewsArticle,
  updateNewsArticle,
  deleteNewsArticle,
  type NewsArticle,
} from '@/lib/data';

export default function NewsPage() {
  const [news, setNews] = React.useState<NewsArticle[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [currentArticle, setCurrentArticle] =
    React.useState<NewsArticle | null>(null);
  const [isSaving, setIsSaving] = React.useState(false);
  const [isDeleting, setIsDeleting] = React.useState<string | null>(null);
  const { toast } = useToast();

  const fetchNews = React.useCallback(async () => {
    setIsLoading(true);
    try {
      const fetchedNews = await getNews();
      setNews(fetchedNews);
    } catch (error) {
      console.error('Failed to fetch news:', error);
      toast({
        title: 'Алдаа',
        description: 'Мэдээг уншихад алдаа гарлаа.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  React.useEffect(() => {
    fetchNews();
  }, [fetchNews]);

  const handleAddArticle = () => {
    setCurrentArticle(null);
    setIsDialogOpen(true);
  };

  const handleEditArticle = (article: NewsArticle) => {
    setCurrentArticle(article);
    setIsDialogOpen(true);
  };

  const handleDeleteArticle = async (articleId: string) => {
    setIsDeleting(articleId);
    try {
      await deleteNewsArticle(articleId);
      toast({
        title: 'Амжилттай',
        description: 'Нийтлэлийг устгалаа.',
      });
      await fetchNews(); // Refresh list
    } catch (error) {
      console.error('Failed to delete article:', error);
      toast({
        title: 'Алдаа',
        description: 'Нийтлэлийг устгахад алдаа гарлаа.',
        variant: 'destructive',
      });
    } finally {
        setIsDeleting(null);
    }
  };
  
  const handleSaveArticle = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSaving(true);
    const formData = new FormData(e.currentTarget);
    const newArticleData = {
      title: formData.get('title') as string,
      date: new Date(formData.get('date') as string).toISOString(),
      summary: formData.get('summary') as string,
      imagePlaceholderId: 'news-1', // Default or select
    };

    try {
        if (currentArticle) {
            await updateNewsArticle(currentArticle.id, newArticleData);
            toast({ title: 'Амжилттай', description: 'Нийтлэлийг шинэчиллээ.' });
        } else {
            await addNewsArticle(newArticleData);
            toast({ title: 'Амжилттай', description: 'Шинэ нийтлэл нэмлээ.' });
        }
        setIsDialogOpen(false);
        await fetchNews(); // Refresh list
    } catch (error) {
      console.error('Failed to save article:', error);
      toast({
        title: 'Алдаа',
        description: 'Нийтлэлийг хадгалахад алдаа гарлаа.',
        variant: 'destructive',
      });
    } finally {
      setIsSaving(false);
    }
  };
  
  const renderSkeleton = () => (
    Array.from({ length: 3 }).map((_, index) => (
       <TableRow key={`skeleton-${index}`}>
            <TableCell>
                <Skeleton className="h-5 w-4/5" />
            </TableCell>
            <TableCell>
                <Skeleton className="h-5 w-24" />
            </TableCell>
            <TableCell>
                 <Skeleton className="h-8 w-8" />
            </TableCell>
        </TableRow>
    ))
  );

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
            {isLoading ? renderSkeleton() : news.map((article) => (
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
                            <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="text-red-600">Устгах</DropdownMenuItem>
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
                              <AlertDialogAction onClick={() => handleDeleteArticle(article.id)} disabled={isDeleting === article.id}>
                                {isDeleting === article.id ? 'Устгаж байна...' : 'Үргэлжлүүлэх'}
                              </AlertDialogAction>
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
         { !isLoading && news.length === 0 && (
            <div className="text-center p-8 text-muted-foreground">
                Мэдээ олдсонгүй.
            </div>
        )}
      </CardContent>
      <CardFooter>
        <div className="text-xs text-muted-foreground">
          Нийт <strong>{news.length}</strong> нийтлэлээс <strong>1-{news.length}</strong>-г харуулж байна
        </div>
      </CardFooter>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{currentArticle ? 'Нийтлэл засах' : 'Нийтлэл нэмэх'}</DialogTitle>
            <DialogDescription>
              {currentArticle ? 'Энэ нийтлэлийн мэдээллийг шинэчлэх.' : 'Шинэ нийтлэл нэмэх.'}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSaveArticle}>
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
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)} disabled={isSaving}>Цуцлах</Button>
              <Button type="submit" disabled={isSaving}>{isSaving ? 'Хадгалж байна...' : 'Хадгалах'}</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </Card>
  );
}
