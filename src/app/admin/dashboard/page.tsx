import Link from "next/link";
import { Building, Construction, Newspaper, ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { projects, services, news } from "@/lib/data";

export default function Dashboard() {
  return (
    <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-headline font-semibold">ABS Барилга Хяналтын самбарт тавтай морил</h1>
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Нийт төсөл</CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{projects.length}</div>
            <p className="text-xs text-muted-foreground">
              танилцуулсан төслүүд
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Санал болгож буй үйлчилгээ
            </CardTitle>
            <Construction className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{services.length}</div>
            <p className="text-xs text-muted-foreground">
              бүртгэгдсэн үйлчилгээ
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Мэдээний нийтлэл</CardTitle>
            <Newspaper className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{news.length}</div>
            <p className="text-xs text-muted-foreground">
              нийтлэгдсэн нийтлэл
            </p>
          </CardContent>
        </Card>
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
