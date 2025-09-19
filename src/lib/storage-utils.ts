import { ref, uploadBytes, getDownloadURL, uploadBytesResumable, UploadTaskSnapshot } from 'firebase/storage';
import { storage, auth } from './firebase/config';

export interface UploadProgress {
  bytesTransferred: number;
  totalBytes: number;
  progress: number;
}

export interface UploadOptions {
  maxRetries?: number;
  retryDelay?: number;
  timeout?: number;
  onProgress?: (progress: UploadProgress) => void;
}

const defaultOptions: Required<UploadOptions> = {
  maxRetries: 3,
  retryDelay: 2000,
  timeout: 60000, // 60 seconds
  onProgress: () => {},
};

/**
 * Upload file with retry logic and timeout handling
 */
export const uploadImageWithRetry = async (
  file: File, 
  path: string, 
  options: UploadOptions = {}
): Promise<string> => {
  const opts = { ...defaultOptions, ...options };
  
  // Check authentication first
  if (!auth.currentUser) {
    throw new Error('Файл хуулахын тулд нэвтэрч орно уу.');
  }
  
  for (let attempt = 1; attempt <= opts.maxRetries; attempt++) {
    try {
      console.log(`Upload attempt ${attempt}/${opts.maxRetries} for ${path}`);
      console.log(`User authenticated: ${auth.currentUser?.email}`);
      
      // Validate file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        throw new Error('Файлын хэмжээ 10MB-с их байж болохгүй.');
      }
      
      // Validate file type
      if (!file.type.startsWith('image/')) {
        throw new Error('Зөвхөн зурагны файл хуулах боломжтой.');
      }
      
      const storageRef = ref(storage, path);
      
      // Use resumable upload for better reliability
      const uploadTask = uploadBytesResumable(storageRef, file, {
        contentType: file.type,
        customMetadata: {
          'uploaded': new Date().toISOString(),
          'originalName': file.name,
          'uploadedBy': auth.currentUser?.email || 'unknown'
        }
      });
      
      // Create promise with timeout
      const uploadPromise = new Promise<UploadTaskSnapshot>((resolve, reject) => {
        const timeoutId = setTimeout(() => {
          uploadTask.cancel();
          reject(new Error(`Upload timeout after ${opts.timeout / 1000} seconds`));
        }, opts.timeout);
        
        uploadTask.on(
          'state_changed',
          (snapshot: UploadTaskSnapshot) => {
            const progress = {
              bytesTransferred: snapshot.bytesTransferred,
              totalBytes: snapshot.totalBytes,
              progress: (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            };
            opts.onProgress(progress);
            console.log(`Upload progress: ${progress.progress.toFixed(1)}%`);
          },
          (error: any) => {
            clearTimeout(timeoutId);
            console.error('Upload task error:', error);
            reject(error);
          },
          () => {
            clearTimeout(timeoutId);
            console.log('Upload task completed successfully');
            resolve(uploadTask.snapshot);
          }
        );
      });
      
      await uploadPromise;
      
      // Get download URL
      console.log('Getting download URL...');
      const downloadURL = await getDownloadURL(storageRef);
      console.log('Upload successful:', downloadURL);
      
      return downloadURL;
      
    } catch (error: any) {
      console.error(`Upload attempt ${attempt} failed:`, error);
      
      // Don't retry for certain errors
      if (error.code === 'storage/unauthorized' || 
          error.code === 'storage/invalid-argument' ||
          error.message.includes('Файлын хэмжээ') ||
          error.message.includes('Зөвхөн зурагны файл') ||
          error.message.includes('нэвтэрч орно уу')) {
        throw error;
      }
      
      if (attempt === opts.maxRetries) {
        // Provide specific error messages for common issues
        if (error.code === 'storage/retry-limit-exceeded') {
          throw new Error('Файл хуулах хугацаа дууслаа. Интернетийн холболтоо шалгаад дахин оролдоно уу.');
        } else if (error.message.includes('timeout')) {
          throw new Error('Файл хуулалт удаашралаа. Интернетийн холболтоо шалгаад дахин оролдоно уу.');
        } else {
          throw new Error(`Файл хуулахад алдаа гарлаа: ${error.message || 'Тодорхойгүй алдаа'}`);
        }
      }
      
      // Wait before retrying with exponential backoff
      const delay = opts.retryDelay * Math.pow(2, attempt - 1);
      console.log(`Waiting ${delay}ms before retry...`);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
  
  throw new Error('Upload failed after all retry attempts');
};

/**
 * Simple upload function with basic retry
 */
export const uploadImageSimple = async (file: File, path: string): Promise<string> => {
  return uploadImageWithRetry(file, path, {
    maxRetries: 2,
    retryDelay: 1000,
    timeout: 30000
  });
};

/**
 * Check if file is valid for upload
 */
export const validateFile = (file: File): { valid: boolean; error?: string } => {
  if (!file) {
    return { valid: false, error: 'Файл сонгоно уу.' };
  }
  
  if (file.size > 10 * 1024 * 1024) {
    return { valid: false, error: 'Файлын хэмжээ 10MB-с их байж болохгүй.' };
  }
  
  if (!file.type.startsWith('image/')) {
    return { valid: false, error: 'Зөвхөн зурагны файл хуулах боломжтой.' };
  }
  
  return { valid: true };
};