import React, { useEffect, useState } from 'react';
import { auth, db, storage } from '@/lib/firebase/config';
import { collection, getDocs } from 'firebase/firestore';
import { ref, listAll } from 'firebase/storage';
import { useAuthState } from 'react-firebase-hooks/auth';

export const FirebaseDebugInfo = () => {
  const [user] = useAuthState(auth);
  const [debugInfo, setDebugInfo] = useState<any>({});
  const [testResult, setTestResult] = useState<string>('');

  useEffect(() => {
    const runDiagnostics = async () => {
      const info: any = {
        timestamp: new Date().toISOString(),
        auth: {
          isLoggedIn: !!user,
          userEmail: user?.email || 'Not logged in',
        },
        firestore: { status: 'Testing...' },
        storage: { status: 'Testing...' }
      };

      // Test Firestore
      try {
        const newsCollection = collection(db, 'news');
        const snapshot = await getDocs(newsCollection);
        info.firestore = {
          status: 'Connected',
          documentsFound: snapshot.size
        };
      } catch (error: any) {
        info.firestore = {
          status: 'Error',
          error: error.message
        };
      }

      // Test Storage
      try {
        const storageRef = ref(storage);
        const result = await listAll(storageRef);
        info.storage = {
          status: 'Connected',
          filesFound: result.items.length,
          foldersFound: result.prefixes.length
        };
      } catch (error: any) {
        info.storage = {
          status: 'Error',
          error: error.message
        };
      }

      setDebugInfo(info);
    };

    if (user !== undefined) { // Only run when auth state is determined
      runDiagnostics();
    }
  }, [user]);

  const testSmartUpload = async () => {
    try {
      setTestResult('Testing direct Firestore upload...');
      
      // Create a small test image file
      const canvas = document.createElement('canvas');
      canvas.width = 100;
      canvas.height = 100;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.fillStyle = '#4CAF50';
        ctx.fillRect(0, 0, 100, 100);
        ctx.fillStyle = 'white';
        ctx.font = '16px Arial';
        ctx.fillText('TEST', 30, 55);
      }
      
      canvas.toBlob(async (blob) => {
        if (blob) {
          const testFile = new File([blob], 'test.png', { type: 'image/png' });
          
          try {
            const { directFirestoreUpload } = await import('@/lib/direct-upload');
            const result = await directFirestoreUpload(testFile, `test/${Date.now()}_test.png`);
            setTestResult(`✅ Upload successful: ${result.substring(0, 50)}...`);
          } catch (error: any) {
            setTestResult(`❌ Upload failed: ${error.message}`);
          }
        }
      }, 'image/png');
      
    } catch (error: any) {
      setTestResult(`❌ Test failed: ${error.message}`);
    }
  };

  if (process.env.NODE_ENV === 'production') {
    return null; // Don't show in production
  }

  return (
    <div style={{
      position: 'fixed',
      bottom: '10px',
      right: '10px',
      background: 'rgba(0,0,0,0.9)',
      color: 'white',
      padding: '15px',
      borderRadius: '8px',
      fontSize: '12px',
      maxWidth: '350px',
      zIndex: 9999,
      maxHeight: '70vh',
      overflow: 'auto'
    }}>
      <div style={{ marginBottom: '10px' }}>
        <strong>🔧 Firebase Debug Info:</strong>
        <button 
          onClick={testSmartUpload}
          style={{
            marginLeft: '10px',
            padding: '4px 8px',
            background: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '10px'
          }}
        >
          Test Upload
        </button>
      </div>
      
      {testResult && (
        <div style={{ 
          marginBottom: '10px', 
          padding: '8px',
          background: testResult.includes('✅') ? 'rgba(76, 175, 80, 0.2)' : 'rgba(244, 67, 54, 0.2)',
          borderRadius: '4px',
          fontSize: '11px'
        }}>
          {testResult}
        </div>
      )}
      
      <pre style={{ fontSize: '10px', overflow: 'auto', lineHeight: '1.3' }}>
        {JSON.stringify(debugInfo, null, 2)}
      </pre>
    </div>
  );
};