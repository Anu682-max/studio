import { collection, addDoc } from 'firebase/firestore';
import { db } from './firebase/config';

/**
 * Direct Firestore upload - bypasses Firebase Storage entirely
 * Use this when Firebase Storage has connectivity issues
 */
export const directFirestoreUpload = async (file: File, path: string): Promise<string> => {
  try {
    console.log('Starting direct Firestore upload...', file.name);
    
    // Validate file
    if (!file) {
      throw new Error('Файл сонгоно уу.');
    }
    
    if (!file.type.startsWith('image/')) {
      throw new Error('Зөвхөн зурагны файл хуулах боломжтой.');
    }
    
    if (file.size > 3 * 1024 * 1024) { // 3MB limit for Firestore
      throw new Error('Файлын хэмжээ 3MB-с их байж болохгүй.');
    }

    // Convert to base64
    const base64Data = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          resolve(reader.result);
        } else {
          reject(new Error('Base64 хөрвүүлэлт амжилтгүй.'));
        }
      };
      reader.onerror = () => reject(new Error('Файл уншихад алдаа гарлаа.'));
      reader.readAsDataURL(file);
    });

    console.log('File converted to base64, storing in Firestore...');

    // Store in Firestore
    const imageDoc = {
      path: path,
      originalName: file.name,
      contentType: file.type,
      size: file.size,
      data: base64Data,
      createdAt: new Date().toISOString(),
      uploadMethod: 'direct-firestore'
    };
    
    const docRef = await addDoc(collection(db, 'images'), imageDoc);
    const firebaseImageUrl = `firestore://${docRef.id}`;
    
    console.log('✅ Image stored successfully in Firestore:', firebaseImageUrl);
    return firebaseImageUrl;
    
  } catch (error: any) {
    console.error('❌ Direct Firestore upload failed:', error);
    throw new Error(`Зураг хадгалахад алдаа гарлаа: ${error.message}`);
  }
};