'use server';

import { z } from 'zod';
import { redirect } from 'next/navigation';

// --- Form Validation Schemas ---
const contactSchema = z.object({
  name: z.string().min(2, { message: 'Нэр дор хаяж 2 тэмдэгттэй байх ёстой.' }),
  email: z.string().email({ message: 'Хүчинтэй и-мэйл хаяг оруулна уу.' }),
  subject: z.string().min(5, { message: 'Гарчиг дор хаяж 5 тэмдэгттэй байх ёстой.' }),
  message: z.string().min(10, { message: 'Зурвас дор хаяж 10 тэмдэгттэй байх ёстой.' }),
});

// --- State Types ---
export type ContactFormState = {
  message: string;
  errors?: {
    name?: string[];
    email?: string[];
    subject?: string[];
    message?: string[];
  };
  success: boolean;
  reset?: boolean;
};


// --- Server Actions ---

export async function login(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  try {
    console.log(`Attempting login for ${email}`);
  } catch (error) {
    console.error('Login failed:', error);
    return { success: false, error: 'И-мэйл эсвэл нууц үг буруу.' };
  }
  
  redirect('/admin/dashboard');
}

export async function logout() {
  console.log('Logging out');
  redirect('/admin/login');
}


export async function submitContactForm(
  prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const validatedFields = contactSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    subject: formData.get('subject'),
    message: formData.get('message'),
  });

  if (!validatedFields.success) {
    return {
      message: 'Формыг илгээхэд алдаа гарлаа.',
      errors: validatedFields.error.flatten().fieldErrors,
      success: false,
    };
  }
  
  try {
    // Simulate sending data to a database or email service
    console.log("Received contact form submission:", validatedFields.data);
    
    // In a real app, you would add the data to Firestore here, e.g.:
    // await addDoc(collection(db, 'contacts'), validatedFields.data);

    return {
      message: 'Таны зурвасыг амжилттай хүлээн авлаа. Бид тантай тун удахгүй холбогдох болно.',
      success: true,
      reset: true,
    };

  } catch (error) {
    console.error("Error submitting contact form:", error);
    return {
      message: 'Зурвас илгээхэд тодорхойгүй алдаа гарлаа. Дахин оролдоно уу.',
      success: false,
    };
  }
}
