// Alternative Firebase Storage Upload with better error handling
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from './firebase/config';

export const uploadImageWithRetry = async (file: File, path: string, maxRetries = 3): Promise<string> => {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      console.log(`Upload attempt ${attempt} for ${path}`);
      
      // Create storage reference
      const storageRef = ref(storage, path);
      
      // Upload file
      const snapshot = await uploadBytes(storageRef, file);
      console.log('Upload successful:', snapshot.metadata.fullPath);
      
      // Get download URL
      const downloadURL = await getDownloadURL(storageRef);
      console.log('Download URL obtained:', downloadURL);
      
      return downloadURL;
    } catch (error) {
      console.error(`Upload attempt ${attempt} failed:`, error);
      
      if (attempt === maxRetries) {
        throw new Error(`Failed to upload after ${maxRetries} attempts: ${error}`);
      }
      
      // Wait before retrying (exponential backoff)
      await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempt) * 1000));
    }
  }
  
  throw new Error('Upload failed after all retry attempts');
};

// Utility function to convert file to base64 (alternative upload method)
export const uploadImageAsBase64 = async (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result);
      } else {
        reject(new Error('Failed to read file as base64'));
      }
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};