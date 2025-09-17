'use server';

import { z } from 'zod';
import { redirect } from 'next/navigation';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';

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
  // Firebase auth is handled on the client-side in login/page.tsx
  // This is a placeholder and could be used for other login-related server logic if needed.
  redirect('/admin/dashboard');
}

export async function logout() {
  // Firebase auth is handled on the client-side
  // This is a placeholder and could be used for other logout-related server logic if needed.
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
    const { name, email, subject, message } = validatedFields.data;

    // Save the original contact message to a 'contacts' collection for record keeping
    await addDoc(collection(db, 'contacts'), {
        name,
        email,
        subject,
        message,
        submittedAt: new Date(),
    });
    
    // Create an email document for the "Trigger Email" extension
    const mailDoc = {
      to: ['anulkhagvazaya5@gmail.com'],
      message: {
        subject: `Шинэ холбоо барих хүсэлт: ${subject}`,
        text: `Таны вэбсайтаас шинэ зурвас ирлээ.\n\n
Нэр: ${name}\n
И-мэйл: ${email}\n
Гарчиг: ${subject}\n
Зурвас:\n${message}\n\n
Энэ имэйл автоматаар үүсгэгдсэн.`,
        html: `<p>Таны вэбсайтаас шинэ зурвас ирлээ.</p>
               <p><strong>Нэр:</strong> ${name}</p>
               <p><strong>И-мэйл:</strong> ${email}</p>
               <p><strong>Гарчиг:</strong> ${subject}</p>
               <p><strong>Зурвас:</strong></p>
               <p>${message}</p>
               <hr>
               <p>Энэ имэйл автоматаар үүсгэгдсэн.</p>`,
      },
    };

    // Add the document to the 'mail' collection to trigger the email
    await addDoc(collection(db, 'mail'), mailDoc);

    return {
      message: 'Таны зурвасыг амжилттай хүлээн авлаа. Бид тантай тун удахгүй холбогдох болно.',
      success: true,
      reset: true,
    };

  } catch (error) {
    console.error("Error submitting contact form or triggering email:", error);
    return {
      message: 'Зурвас илгээхэд тодорхойгүй алдаа гарлаа. Дахин оролдоно уу.',
      success: false,
    };
  }
}
