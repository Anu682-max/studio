"use client";

import * as React from "react";
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

import { services as initialServices, type Service } from "@/lib/data";
import { Building, DraftingCompass, Hammer, Home, LandPlot, PaintRoller } from "lucide-react";

const iconMap = {
    Building, DraftingCompass, Hammer, Home, PaintRoller, LandPlot
}

export default function ServicesPage() {
  const [services, setServices] = React.useState(initialServices);
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [currentService, setCurrentService] = React.useState<Service | null>(null);

  const handleAddService = () => {
    setCurrentService(null);
    setIsDialogOpen(true);
  };

  const handleEditService = (service: Service) => {
    setCurrentService(service);
    setIsDialogOpen(true);
  };

  const handleDeleteService = (serviceTitle: string) => {
    setServices(services.filter((s) => s.title !== serviceTitle));
  };
  
  const handleSaveService = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newService: Service = {
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      icon: iconMap[formData.get("icon") as keyof typeof iconMap] || Building,
    };

    if (currentService) {
      setServices(services.map((s) => (s.title === currentService.title ? newService : s)));
    } else {
      setServices([newService, ...services]);
    }
    setIsDialogOpen(false);
  };

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
            {services.map((service) => (
              <TableRow key={service.title}>
                <TableCell className="font-medium">{service.title}</TableCell>
                <TableCell className="text-muted-foreground">{service.description}</TableCell>
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
                      <DropdownMenuItem onClick={() => handleEditService(service)}>Засах</DropdownMenuItem>
                       <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>Устгах</DropdownMenuItem>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Та итгэлтэй байна уу?</AlertDialogTitle>
                              <AlertDialogDescription>
                                Энэ үйлдлийг буцаах боломжгүй. Энэ нь үйлчилгээг бүрмөсөн устгах болно.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Цуцлах</AlertDialogCancel>
                              <AlertDialogAction onClick={() => handleDeleteService(service.title)}>Үргэлжлүүлэх</AlertDialogAction>
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
          Нийт <strong>{services.length}</strong> үйлчилгээнээс <strong>1-{services.length}</strong>-г харуулж байна
        </div>
      </CardFooter>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <form onSubmit={handleSaveService}>
            <DialogHeader>
              <DialogTitle>{currentService ? 'Үйлчилгээ засах' : 'Үйлчилгээ нэмэх'}</DialogTitle>
              <DialogDescription>
                {currentService ? 'Энэ үйлчилгээний мэдээллийг шинэчлэх.' : 'Компанийнхаа санал болгож буй шинэ үйлчилгээ нэмэх.'}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="title" className="text-right">
                  Гарчиг
                </Label>
                <Input id="title" name="title" defaultValue={currentService?.title} className="col-span-3" required/>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">
                  Тайлбар
                </Label>
                <Textarea id="description" name="description" defaultValue={currentService?.description} className="col-span-3" required/>
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
