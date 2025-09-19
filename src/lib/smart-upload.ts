import { collection, addDoc, updateDoc, doc } from 'firebase/firestore';
import { db } from './firebase/config';

/**
 * Alternative upload method: Store images as base64 in Firestore
 * This bypasses Firebase Storage connectivity issues
 */
export const uploadImageAsBase64 = async (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    // Validate file
    if (file.size > 5 * 1024 * 1024) { // 5MB limit for base64
      reject(new Error('Файлын хэмжээ 5MB-с их байж болохгүй (Base64 горим).'));
      return;
    }

    if (!file.type.startsWith('image/')) {
      reject(new Error('Зөвхөн зурагны файл хуулах боломжтой.'));
      return;
    }

    const reader = new FileReader();
    
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        console.log('Base64 conversion successful');
        resolve(reader.result);
      } else {
        reject(new Error('Base64 хөрвүүлэлт амжилтгүй.'));
      }
    };
    
    reader.onerror = () => {
      reject(new Error('Файл уншихад алдаа гарлаа.'));
    };
    
    reader.readAsDataURL(file);
  });
};

/**
 * Store image metadata and base64 data in Firestore
 */
export const storeImageInFirestore = async (file: File, path: string): Promise<string> => {
  try {
    console.log('Storing image in Firestore as fallback...');
    
    const base64Data = await uploadImageAsBase64(file);
    
    const imageDoc = {
      path: path,
      originalName: file.name,
      contentType: file.type,
      size: file.size,
      data: base64Data,
      createdAt: new Date().toISOString(),
      uploadMethod: 'firestore-base64'
    };
    
    const docRef = await addDoc(collection(db, 'images'), imageDoc);
    
    // Return a reference that can be used to retrieve the image
    const firebaseImageUrl = `firestore://${docRef.id}`;
    console.log('Image stored in Firestore:', firebaseImageUrl);
    
    return firebaseImageUrl;
  } catch (error: any) {
    console.error('Firestore image storage failed:', error);
    throw new Error(`Firestore-д зураг хадгалахад алдаа гарлаа: ${error.message}`);
  }
};

/**
 * Smart upload function that tries Firebase Storage first, then falls back to Firestore
 */
export const smartUploadImage = async (file: File, path: string): Promise<string> => {
  // Validate file first
  if (!file) {
    throw new Error('Файл сонгоно уу.');
  }
  
  if (!file.type.startsWith('image/')) {
    throw new Error('Зөвхөн зурагны файл хуулах боломжтой.');
  }
  
  if (file.size > 10 * 1024 * 1024) {
    throw new Error('Файлын хэмжээ 10MB-с их байж болохгүй.');
  }

  try {
    // First try Firebase Storage (if available)
    console.log('Attempting Firebase Storage upload...');
    const { uploadImageWithRetry } = await import('./storage-utils');
    return await uploadImageWithRetry(file, path, {
      maxRetries: 1, // Only 1 retry for faster fallback
      timeout: 10000 // 10 seconds timeout instead of 120
    });
  } catch (storageError: any) {
    console.log('Firebase Storage failed, falling back to Firestore...', storageError.message);
    
    try {
      // Fallback to Firestore base64 storage
      console.log('Using Firestore fallback method...');
      return await storeImageInFirestore(file, path);
    } catch (firestoreError: any) {
      console.error('All upload methods failed:', firestoreError);
      throw new Error('Файл хуулах бүх аргууд амжилтгүй боллоо. Интернетийн холболтоо шалгаад дахин оролдоно уу.');
    }
  }
};