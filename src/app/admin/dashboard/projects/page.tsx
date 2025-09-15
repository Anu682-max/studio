"use client";

import * as React from "react";
import Image from "next/image";
import { MoreHorizontal, PlusCircle } from "lucide-react";

import { Badge } from "@/components/ui/badge";
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
  DialogTrigger,
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
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

import { projects as initialProjects, type Project } from "@/lib/data";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export default function ProjectsPage() {
  const [projects, setProjects] = React.useState<Project[]>(initialProjects);
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [currentProject, setCurrentProject] = React.useState<Project | null>(null);

  const handleAddProject = () => {
    setCurrentProject(null);
    setIsDialogOpen(true);
  };

  const handleEditProject = (project: Project) => {
    setCurrentProject(project);
    setIsDialogOpen(true);
  };

  const handleDeleteProject = (projectId: string) => {
    setProjects(projects.filter((p) => p.id !== projectId));
  };
  
  const handleSaveProject = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newProject: Project = {
      id: currentProject?.id || `p${Date.now()}`,
      title: formData.get("title") as string,
      category: formData.get("category") as string,
      imagePlaceholderId: 'project-1', // Default or select
    };

    if (currentProject) {
      setProjects(projects.map((p) => (p.id === currentProject.id ? newProject : p)));
    } else {
      setProjects([newProject, ...projects]);
    }
    setIsDialogOpen(false);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
            <div>
                <CardTitle>Төслүүд</CardTitle>
                <CardDescription>
                    Компанийнхаа төслүүдийг удирдах.
                </CardDescription>
            </div>
            <Button size="sm" className="gap-1" onClick={handleAddProject}>
                <PlusCircle className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Төсөл нэмэх
                </span>
            </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="hidden w-[100px] sm:table-cell">
                <span className="sr-only">Зураг</span>
              </TableHead>
              <TableHead>Гарчиг</TableHead>
              <TableHead>Ангилал</TableHead>
              <TableHead>
                <span className="sr-only">Үйлдлүүд</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {projects.map((project) => {
              const image = PlaceHolderImages.find(p => p.id === project.imagePlaceholderId);
              return (
              <TableRow key={project.id}>
                <TableCell className="hidden sm:table-cell">
                    {image && (
                        <Image
                            alt={project.title}
                            className="aspect-square rounded-md object-cover"
                            height="64"
                            src={image.imageUrl}
                            width="64"
                            data-ai-hint={image.imageHint}
                        />
                    )}
                </TableCell>
                <TableCell className="font-medium">{project.title}</TableCell>
                <TableCell>
                  <Badge variant="outline">{project.category}</Badge>
                </TableCell>
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
                      <DropdownMenuItem onClick={() => handleEditProject(project)}>Засах</DropdownMenuItem>
                       <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>Устгах</DropdownMenuItem>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Та итгэлтэй байна уу?</AlertDialogTitle>
                              <AlertDialogDescription>
                                Энэ үйлдлийг буцаах боломжгүй. Энэ нь төслийг бүрмөсөн устгах болно.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Цуцлах</AlertDialogCancel>
                              <AlertDialogAction onClick={() => handleDeleteProject(project.id)}>Үргэлжлүүлэх</AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            )})}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        <div className="text-xs text-muted-foreground">
          Нийт <strong>{projects.length}</strong> төслөөс <strong>1-{projects.length}</strong>-г харуулж байна
        </div>
      </CardFooter>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <form onSubmit={handleSaveProject}>
            <DialogHeader>
              <DialogTitle>{currentProject ? 'Төсөл засах' : 'Төсөл нэмэх'}</DialogTitle>
              <DialogDescription>
                {currentProject ? 'Төслийнхөө мэдээллийг шинэчлэх.' : 'Багцдаа шинэ төсөл нэмэх.'}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="title" className="text-right">
                  Гарчиг
                </Label>
                <Input id="title" name="title" defaultValue={currentProject?.title} className="col-span-3" required/>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="category" className="text-right">
                  Ангилал
                </Label>
                <Input id="category" name="category" defaultValue={currentProject?.category} className="col-span-3" required/>
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
