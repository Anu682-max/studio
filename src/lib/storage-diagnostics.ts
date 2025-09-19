import { ref, getDownloadURL, listAll } from 'firebase/storage';
import { storage } from './firebase/config';

/**
 * Test Firebase Storage connectivity
 */
export const testStorageConnection = async (): Promise<boolean> => {
  try {
    console.log('Testing Firebase Storage connection...');
    
    // Try to list items in the root directory
    const rootRef = ref(storage);
    const result = await listAll(rootRef);
    
    console.log('Storage connection successful');
    console.log(`Found ${result.items.length} files and ${result.prefixes.length} folders`);
    
    return true;
  } catch (error: any) {
    console.error('Storage connection failed:', error);
    return false;
  }
};

/**
 * Test if we can access a specific path
 */
export const testStoragePath = async (path: string): Promise<boolean> => {
  try {
    const pathRef = ref(storage, path);
    await listAll(pathRef);
    console.log(`Path ${path} is accessible`);
    return true;
  } catch (error: any) {
    console.error(`Path ${path} is not accessible:`, error);
    return false;
  }
};

/**
 * Get storage diagnostics info
 */
export const getStorageDiagnostics = async () => {
  const diagnostics = {
    timestamp: new Date().toISOString(),
    storageConfig: {
      bucket: storage.app.options.storageBucket,
      projectId: storage.app.options.projectId,
    },
    connectivity: {
      rootAccess: false,
      newsPath: false,
      projectsPath: false,
    }
  };
  
  try {
    // Test root access
    diagnostics.connectivity.rootAccess = await testStorageConnection();
    
    // Test specific paths
    diagnostics.connectivity.newsPath = await testStoragePath('news/');
    diagnostics.connectivity.projectsPath = await testStoragePath('projects/');
    
  } catch (error) {
    console.error('Diagnostics failed:', error);
  }
  
  console.log('Storage diagnostics:', diagnostics);
  return diagnostics;
};