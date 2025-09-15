import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Icons } from "@/components/icons";

// Placeholder for server action
async function handleLogin(formData: FormData) {
  "use server";
  const email = formData.get("email") as string;
  // In a real app, you'd validate and use Firebase Auth here.
  console.log("Attempting login for:", email);
  // For now, let's just redirect to dashboard
  const { redirect } = await import("next/navigation");
  redirect("/admin/dashboard");
}

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-secondary p-4">
      <Card className="mx-auto max-w-sm w-full">
        <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
               <Icons.Logo />
            </div>
          <CardTitle className="text-2xl font-headline">Админ нэвтрэх</CardTitle>
          <CardDescription>
            Хяналтын самбарт нэвтрэхийн тулд нэвтрэх мэдээллээ оруулна уу.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={handleLogin} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">И-мэйл</Label>
              <Input
                id="email"
                type="email"
                name="email"
                placeholder="admin@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Нууц үг</Label>
                <Link
                  href="#"
                  className="ml-auto inline-block text-sm underline"
                >
                  Нууц үгээ мартсан уу?
                </Link>
              </div>
              <Input id="password" type="password" name="password" required />
            </div>
            <Button type="submit" className="w-full">
              Нэвтрэх
            </Button>
            <Button variant="outline" className="w-full" asChild>
                <Link href="/">Вэбсайт руу буцах</Link>
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
