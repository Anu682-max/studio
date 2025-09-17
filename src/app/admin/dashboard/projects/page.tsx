'use client';

import * as React from 'react';
import Image from 'next/image';
import { MoreHorizontal, PlusCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

import { Badge } from '@/components/ui/badge';
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
import { Skeleton } from '@/components/ui/skeleton';

import {
  getProjects,
  addProject,
  updateProject,
  deleteProject,
  uploadImage,
  type Project,
} from '@/lib/data';

export default function ProjectsPage() {
  const [projects, setProjects] = React.useState<Project[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [currentProject, setCurrentProject] =
    React.useState<Project | null>(null);
  const [isSaving, setIsSaving] = React.useState(false);
  const [isDeleting, setIsDeleting] = React.useState<string | null>(null);
  const { toast } = useToast();

  const fetchProjects = React.useCallback(async () => {
    setIsLoading(true);
    try {
      const fetchedProjects = await getProjects();
      setProjects(fetchedProjects);
    } catch (error) {
      console.error('Failed to fetch projects:', error);
      toast({
        title: 'Алдаа',
        description: 'Төслүүдийг уншихад алдаа гарлаа.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  React.useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const handleAddProject = () => {
    setCurrentProject(null);
    setIsDialogOpen(true);
  };

  const handleEditProject = (project: Project) => {
    setCurrentProject(project);
    setIsDialogOpen(true);
  };

  const handleDeleteProject = async (projectId: string) => {
    setIsDeleting(projectId);
    try {
      await deleteProject(projectId);
      toast({
        title: 'Амжилттай',
        description: 'Төслийг устгалаа.',
      });
      await fetchProjects(); // Refresh list
    } catch (error) {
      console.error('Failed to delete project:', error);
      toast({
        title: 'Алдаа',
        description: 'Төслийг устгахад алдаа гарлаа.',
        variant: 'destructive',
      });
    } finally {
        setIsDeleting(null);
    }
  };

  const handleSaveProject = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSaving(true);
    const formData = new FormData(e.currentTarget);
    const imageFile = formData.get('image') as File;

    try {
      let imageUrl = currentProject?.imageUrl || '';
      
      if (imageFile && imageFile.size > 0) {
        imageUrl = await uploadImage(imageFile, `projects/${Date.now()}_${imageFile.name}`);
      }

      const projectData = {
        title: formData.get('title') as string,
        category: formData.get('category') as string,
        imageUrl: imageUrl,
      };

      if (currentProject) {
        await updateProject(currentProject.id, projectData);
        toast({ title: 'Амжилттай', description: 'Төслийг шинэчиллээ.' });
      } else {
        if (!projectData.imageUrl) {
            toast({
                title: 'Алдаа',
                description: 'Шинэ төсөл нэмэхдээ зураг оруулах шаардлагатай.',
                variant: 'destructive',
            });
            setIsSaving(false); // Make sure to stop saving state
            return;
        }
        await addProject(projectData as Omit<Project, 'id'>);
        toast({ title: 'Амжилттай', description: 'Шинэ төсөл нэмлээ.' });
      }
      
      setIsDialogOpen(false);
      setCurrentProject(null);
      await fetchProjects(); // Refresh list
    } catch (error) {
      console.error('Failed to save project:', error);
      toast({
        title: 'Алдаа',
        description: 'Төслийг хадгалахад алдаа гарлаа.',
        variant: 'destructive',
      });
    } finally {
      setIsSaving(false);
    }
  };
  
  const renderSkeleton = () => (
    Array.from({ length: 3 }).map((_, index) => (
       <TableRow key={`skeleton-${index}`}>
            <TableCell className="hidden sm:table-cell">
                <Skeleton className="h-16 w-16 rounded-md" />
            </TableCell>
            <TableCell>
                <Skeleton className="h-5 w-48" />
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
            <CardTitle>Төслүүд</CardTitle>
            <CardDescription>Компанийнхаа төслүүдийг удирдах.</CardDescription>
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
            {isLoading ? renderSkeleton() : projects.map((project) => {
              return (
                <TableRow key={project.id}>
                  <TableCell className="hidden sm:table-cell">
                    {project.imageUrl && (
                      <Image
                        alt={project.title}
                        className="aspect-square rounded-md object-cover"
                        height="64"
                        src={project.imageUrl}
                        width="64"
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
                          onClick={() => handleEditProject(project)}
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
                                Энэ үйлдлийг буцаах боломжгүй. Энэ нь төслийг
                                бүрмөсөн устгах болно.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Цуцлах</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDeleteProject(project.id)}
                                disabled={isDeleting === project.id}
                              >
                                {isDeleting === project.id ? 'Устгаж байна...' : 'Үргэлжлүүлэх'}
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
         { !isLoading && projects.length === 0 && (
            <div className="text-center p-8 text-muted-foreground">
                Төсөл олдсонгүй.
            </div>
        )}
      </CardContent>
      <CardFooter>
        <div className="text-xs text-muted-foreground">
           Нийт <strong>{projects.length}</strong> төслөөс <strong>1-{projects.length}</strong>-г харуулж байна
        </div>
      </CardFooter>

      <Dialog open={isDialogOpen} onOpenChange={(isOpen) => {
        if (!isSaving) {
            setIsDialogOpen(isOpen);
            if (!isOpen) {
                setCurrentProject(null);
            }
        }
      }}>
        <DialogContent className="sm:max-w-[425px]">
          <form onSubmit={handleSaveProject}>
            <DialogHeader>
              <DialogTitle>
                {currentProject ? 'Төсөл засах' : 'Төсөл нэмэх'}
              </DialogTitle>
              <DialogDescription>
                {currentProject
                  ? 'Төслийнхөө мэдээллийг шинэчлэх.'
                  : 'Багцдаа шинэ төсөл нэмэх.'}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="title" className="text-right">
                  Гарчиг
                </Label>
                <Input
                  id="title"
                  name="title"
                  defaultValue={currentProject?.title}
                  className="col-span-3"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="category" className="text-right">
                  Ангилал
                </Label>
                <Input
                  id="category"
                  name="category"
                  defaultValue={currentProject?.category}
                  className="col-span-3"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="image" className="text-right">
                  Зураг
                </Label>
                <Input
                  id="image"
                  name="image"
                  type="file"
                  className="col-span-3"
                  accept="image/*"
                  required={!currentProject}
                />
              </div>
               {currentProject?.imageUrl && (
                <div className="grid grid-cols-4 items-center gap-4">
                    <div className="col-start-2 col-span-3">
                         <Image src={currentProject.imageUrl} alt="Current project image" width={100} height={100} className="rounded-md object-cover" />
                         <p className="text-xs text-muted-foreground mt-1">Одоогийн зураг. Шинээр оруулах бол дээрээс сонгоно уу.</p>
                    </div>
                </div>
              )}
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
