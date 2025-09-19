import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/lib/firebase/config';

/**
 * Custom hook to check authentication status for uploads
 */
export const useAuthForUploads = () => {
  const [user, loading, error] = useAuthState(auth);
  
  const canUpload = user !== null && !loading;
  const uploadError = error ? 'Authentication error' : 
                    !user && !loading ? 'User not authenticated' : null;
  
  return {
    user,
    loading,
    error,
    canUpload,
    uploadError
  };
};

/**
 * Check if user is authenticated before upload
 */
export const checkAuthForUpload = async (): Promise<boolean> => {
  return new Promise((resolve) => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      unsubscribe();
      resolve(user !== null);
    });
    
    // Timeout after 5 seconds
    setTimeout(() => {
      unsubscribe();
      resolve(false);
    }, 5000);
  });
};