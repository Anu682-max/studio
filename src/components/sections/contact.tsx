'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { submitContactForm, type ContactFormState } from '@/app/actions';
import { useEffect, useRef, useActionState } from 'react';


import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, MapPin, Phone } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const contactSchema = z.object({
  name: z.string().min(2, { message: 'Нэр дор хаяж 2 тэмдэгттэй байх ёстой.' }),
  email: z.string().email({ message: 'Хүчинтэй и-мэйл хаяг оруулна уу.' }),
  subject: z.string().min(5, { message: 'Гарчиг дор хаяж 5 тэмдэгттэй байх ёстой.' }),
  message: z.string().min(10, { message: 'Зурвас дор хаяж 10 тэмдэгттэй байх ёстой.' }),
});

type ContactFormValues = z.infer<typeof contactSchema>;

const initialState: ContactFormState = {
    message: '',
    success: false,
};

export default function Contact() {
  const { toast } = useToast();
  const [formState, formAction] = useActionState(submitContactForm, initialState);
  const formRef = useRef<HTMLFormElement>(null);
  
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
  });

  useEffect(() => {
    if (formState.message) {
      toast({
        title: formState.success ? 'Амжилттай!' : 'Алдаа',
        description: formState.message,
        variant: formState.success ? 'default' : 'destructive',
      });
    }
    if (formState.success && formState.reset) {
        formRef.current?.reset();
        form.reset();
    }
    if (!formState.success && formState.errors) {
       Object.entries(formState.errors).forEach(([key, value]) => {
            form.setError(key as keyof ContactFormValues, {
                type: 'manual',
                message: (value as string[]).join(' '),
            });
        });
    }
  }, [formState, toast, form]);


  return (
    <section id="contact" className="container">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold font-headline">Холбоо бариарай</h2>
        <p className="mt-2 text-lg text-muted-foreground max-w-2xl mx-auto">
          Төсөл хэрэгжүүлэхээр төлөвлөж байна уу? Бид тантай ярилцахдаа таатай байх болно.
        </p>
      </div>

      <div className="grid md:grid-cols-5 gap-12">
        <div className="md:col-span-2 space-y-8">
            <div>
              <h3 className="text-xl font-semibold font-headline mb-3">Холбоо барих мэдээлэл</h3>
              <p className="text-muted-foreground mb-6">Энэхүү формыг бөглөснөөр манай баг тантай 24 цагийн дотор холбогдох болно.</p>
               <ul className="space-y-4 text-sm">
                <li className="flex items-center">
                  <Phone className="w-5 h-5 mr-4 text-accent" />
                  <a href="tel:+1234567890" className=" hover:text-primary">(123) 456-7890</a>
                </li>
                <li className="flex items-center">
                  <Mail className="w-5 h-5 mr-4 text-accent" />
                  <a href="mailto:contact@absbuild.com" className=" hover:text-primary">contact@absbuild.com</a>
                </li>
                <li className="flex items-start">
                  <MapPin className="w-5 h-5 mr-4 mt-1 text-accent" />
                  <span>123 Барилгын гудамж, <br />Метрополис, 10101</span>
                </li>
              </ul>
            </div>
            <div className="h-64 w-full bg-muted rounded-lg overflow-hidden">
                <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.622953164287!2d-73.98784368459426!3d40.74844097932824!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9b3117469%3A0xd134e199a405a163!2sEmpire%20State%20Building!5e0!3m2!1sen!2sus!4v1680000000000!5m2!1sen!2sus" 
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }} 
                    allowFullScreen={false}
                    loading="lazy"
                    title="Company Location"
                    referrerPolicy="no-referrer-when-downgrade">
                </iframe>
            </div>
        </div>

        <div className="md:col-span-3">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline">Бидэнд зурвас илгээх</CardTitle>
              <CardDescription>Бүх талбарыг бөглөх шаардлагатай.</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form 
                  ref={formRef} 
                  action={formAction}
                  onSubmit={form.handleSubmit(() => formAction(new FormData(formRef.current!)))} 
                  className="space-y-6"
                >
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Овог, нэр</FormLabel>
                        <FormControl>
                          <Input placeholder="Хонгилдон" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>И-мэйл хаяг</FormLabel>
                        <FormControl>
                          <Input placeholder="email@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Гарчиг</FormLabel>
                        <FormControl>
                          <Input placeholder="Миний шинэ төслийн талаар..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Зурвас</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Төсөл эсвэл хүсэлтийнхээ талаар бидэнд ярина уу." className="min-h-[120px]" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit">
                    Илгээх
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
