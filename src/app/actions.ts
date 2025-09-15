'use server';

import { z } from 'zod';

const contactSchema = z.object({
  name: z.string().min(2, { message: 'Нэр дор хаяж 2 тэмдэгттэй байх ёстой.' }),
  email: z.string().email({ message: 'Хүчинтэй и-мэйл хаяг оруулна уу.' }),
  subject: z.string().min(5, { message: 'Гарчиг дор хаяж 5 тэмдэгттэй байх ёстой.' }),
  message: z.string().min(10, { message: 'Зурвас дор хаяж 10 тэмдэгттэй байх ёстой.' }),
});

export async function submitContactForm(prevState: any, formData: FormData) {
  const validatedFields = contactSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    subject: formData.get('subject'),
    message: formData.get('message'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Доорх алдааг засна уу.',
      success: false,
    };
  }

  // Here you would typically send an email, save to a database, etc.
  // For this example, we'll just log the data.
  console.log('Contact form submitted:');
  console.log(validatedFields.data);

  return {
    message: 'Зурвас илгээсэнд баярлалаа! Бид тантай удахгүй холбогдох болно.',
    success: true,
    reset: true,
  };
}
