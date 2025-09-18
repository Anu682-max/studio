'use client';

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase/config";

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
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsPending(true);

    if (!email || !password) {
      setError("И-мэйл, нууц үгээ оруулна уу.");
      setIsPending(false);
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast({
        title: "Амжилттай нэвтэрлээ",
        description: "Хяналтын самбар луу шилжиж байна...",
      });
      router.push("/admin/dashboard");
    } catch (error: any) {
      setIsPending(false);
      console.error("Firebase Login Error:", error);
      let errorMessage = "Нэвтрэхэд алдаа гарлаа. Дахин оролдоно уу.";
      switch (error.code) {
        case "auth/user-not-found":
        case "auth/wrong-password":
        case "auth/invalid-credential":
          errorMessage = "И-мэйл эсвэл нууц үг буруу байна.";
          break;
        case "auth/invalid-email":
          errorMessage = "Хүчингүй и-мэйл хаяг.";
          break;
        default:
          errorMessage = "Тодорхойгүй алдаа гарлаа.";
          break;
      }
      setError(errorMessage);
       toast({
        title: "Нэвтрэхэд алдаа гарлаа",
        description: errorMessage,
        variant: "destructive"
      });
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="mx-auto max-w-sm w-full">
        <CardHeader className="text-center">
          <Link href="/" className="flex justify-center items-center space-x-2 mb-4">
              <Icons.Logo />
              <span className="font-bold text-xl font-headline">ABS Барилга</span>
          </Link>
          <CardTitle className="text-2xl font-headline">Админ нэвтрэх</CardTitle>
          <CardDescription>
            Хяналтын самбарт нэвтрэхийн тулд нэвтрэх мэдээллээ оруулна уу.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="grid gap-4">
            {error && (
               <Alert variant="destructive">
                  <Terminal className="h-4 w-4" />
                  <AlertTitle>Алдаа</AlertTitle>
                  <AlertDescription>
                   {error}
                  </AlertDescription>
                </Alert>
            )}
            <div className="grid gap-2">
              <Label htmlFor="email">И-мэйл</Label>
              <Input
                id="email"
                type="email"
                name="email"
                placeholder="admin@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isPending}
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
              <Input 
                id="password" 
                type="password" 
                name="password" 
                required 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isPending}
              />
            </div>
            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? "Нэвтэрч байна..." : "Нэвтрэх"}
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
