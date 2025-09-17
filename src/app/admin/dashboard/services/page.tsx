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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';

import {
  getServices,
  addService,
  updateService,
  deleteService,
  iconMap,
  type Service,
} from '@/lib/data';

export default function ServicesPage() {
  const [services, setServices] = React.useState<Service[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [currentService, setCurrentService] =
    React.useState<Service | null>(null);
  const [isSaving, setIsSaving] = React.useState(false);
  const [isDeleting, setIsDeleting] = React.useState<string | null>(null);
  const { toast } = useToast();

  const fetchServices = React.useCallback(async () => {
    setIsLoading(true);
    try {
      const fetchedServices = await getServices();
      setServices(fetchedServices);
    } catch (error) {
      console.error('Failed to fetch services:', error);
      toast({
        title: 'Алдаа',
        description: 'Үйлчилгээнүүдийг уншихад алдаа гарлаа.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  React.useEffect(() => {
    fetchServices();
  }, [fetchServices]);

  const handleAddService = () => {
    setCurrentService(null);
    setIsDialogOpen(true);
  };

  const handleEditService = (service: Service) => {
    setCurrentService(service);
    setIsDialogOpen(true);
  };

  const handleDeleteService = async (serviceId: string) => {
    if (!serviceId) return;
    setIsDeleting(serviceId);
    try {
      await deleteService(serviceId);
      toast({
        title: 'Амжилттай',
        description: 'Үйлчилгээг устгалаа.',
      });
      await fetchServices(); // Refresh list
    } catch (error) {
      console.error('Failed to delete service:', error);
      toast({
        title: 'Алдаа',
        description: 'Үйлчилгээг устгахад алдаа гарлаа.',
        variant: 'destructive',
      });
    } finally {
      setIsDeleting(null);
    }
  };

  const handleSaveService = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSaving(true);
    const formData = new FormData(e.currentTarget);
    const serviceData = {
      title: formData.get('title') as string,
      description: formData.get('description') as string,
      icon: formData.get('icon') as string,
    };

    try {
      if (currentService?.id) {
        await updateService(currentService.id, serviceData);
        toast({ title: 'Амжилттай', description: 'Үйлчилгээг шинэчиллээ.' });
      } else {
        await addService(serviceData);
        toast({ title: 'Амжилттай', description: 'Шинэ үйлчилгээ нэмлээ.' });
      }
      setIsDialogOpen(false);
      await fetchServices(); // Refresh list
    } catch (error) {
      console.error('Failed to save service:', error);
      toast({
        title: 'Алдаа',
        description: 'Үйлчилгээг хадгалахад алдаа гарлаа.',
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
                <Skeleton className="h-5 w-32" />
            </TableCell>
            <TableCell>
                <Skeleton className="h-5 w-full" />
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
            <CardTitle>Үйлчилгээ</CardTitle>
            <CardDescription>
              Компанийнхаа санал болгодог үйлчилгээг удирдах.
            </CardDescription>
          </div>
          <Button size="sm" className="gap-1" onClick={handleAddService}>
            <PlusCircle className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Үйлчилгээ нэмэх
            </span>
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Гарчиг</TableHead>
              <TableHead>Тайлбар</TableHead>
              <TableHead>
                <span className="sr-only">Үйлдлүүд</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
             {isLoading ? renderSkeleton() : services.map((service) => (
              <TableRow key={service.id}>
                <TableCell className="font-medium">{service.title}</TableCell>
                <TableCell className="text-muted-foreground">
                  {service.description}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        aria-haspopup="true"
                        size="icon"
                        variant="ghost"
                      >
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Цэс</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Үйлдлүүд</DropdownMenuLabel>
                      <DropdownMenuItem
                        onClick={() => handleEditService(service)}
                      >
                        Засах
                      </DropdownMenuItem>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <DropdownMenuItem
                            onSelect={(e) => e.preventDefault()}
                            className="text-red-600"
                          >
                            Устгах
                          </DropdownMenuItem>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Та итгэлтэй байна уу?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              Энэ үйлдлийг буцаах боломжгүй. Энэ нь
                              үйлчилгээг бүрмөсөн устгах болно.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Цуцлах</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDeleteService(service.id!)}
                              disabled={isDeleting === service.id}
                            >
                               {isDeleting === service.id ? 'Устгаж байна...' : 'Үргэлжлүүлэх'}
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
         { !isLoading && services.length === 0 && (
            <div className="text-center p-8 text-muted-foreground">
                Үйлчилгээ олдсонгүй.
            </div>
        )}
      </CardContent>
      <CardFooter>
        <div className="text-xs text-muted-foreground">
           Нийт <strong>{services.length}</strong> үйлчилгээнээс <strong>1-{services.length}</strong>-г харуулж байна
        </div>
      </CardFooter>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              {currentService ? 'Үйлчилгээ засах' : 'Үйлчилгээ нэмэх'}
            </DialogTitle>
            <DialogDescription>
              {currentService
                ? 'Энэ үйлчилгээний мэдээллийг шинэчлэх.'
                : 'Компанийнхаа санал болгож буй шинэ үйлчилгээ нэмэх.'}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSaveService}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="title" className="text-right">
                  Гарчиг
                </Label>
                <Input
                  id="title"
                  name="title"
                  defaultValue={currentService?.title}
                  className="col-span-3"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">
                  Тайлбар
                </Label>
                <Textarea
                  id="description"
                  name="description"
                  defaultValue={currentService?.description}
                  className="col-span-3"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="icon" className="text-right">
                  Дүрс
                </Label>
                <Select
                  name="icon"
                  defaultValue={currentService?.icon}
                  required
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Дүрс сонгох" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.keys(iconMap).map((iconName) => {
                      const Icon = iconMap[iconName];
                      return (
                        <SelectItem key={iconName} value={iconName}>
                          <div className="flex items-center gap-2">
                            <Icon className="h-4 w-4" />
                            <span>{iconName}</span>
                          </div>
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsDialogOpen(false)}
                disabled={isSaving}
              >
                Цуцлах
              </Button>
              <Button type="submit" disabled={isSaving}>
                {isSaving ? 'Хадгалж байна...' : 'Хадгалах'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </Card>
  );
}
