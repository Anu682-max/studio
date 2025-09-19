import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { uploadImage } from '@/lib/data';
import { getStorageDiagnostics } from '@/lib/storage-diagnostics';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/lib/firebase/config';

interface UploadProgress {
  progress: number;
  bytesTransferred: number;
  totalBytes: number;
}

export default function StorageTest() {
  const [user] = useAuthState(auth);
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState<UploadProgress | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [diagnostics, setDiagnostics] = useState<any>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setResult(null);
      setError(null);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    setUploading(true);
    setError(null);
    setResult(null);
    setProgress(null);

    try {
      console.log('Starting upload test...');
      const path = `test/${Date.now()}_${file.name}`;
      const downloadURL = await uploadImage(file, path);
      
      setResult(downloadURL);
      console.log('Upload successful:', downloadURL);
    } catch (err: any) {
      setError(err.message || 'Upload failed');
      console.error('Upload failed:', err);
    } finally {
      setUploading(false);
      setProgress(null);
    }
  };

  const handleDiagnostics = async () => {
    try {
      const diag = await getStorageDiagnostics();
      setDiagnostics(diag);
    } catch (err) {
      console.error('Diagnostics failed:', err);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Firebase Storage Test</CardTitle>
          <CardDescription>
            Test file upload functionality and diagnose connectivity issues
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Auth Status */}
          <Alert>
            <AlertDescription>
              Authentication Status: {user ? `Logged in as ${user.email}` : 'Not logged in'}
            </AlertDescription>
          </Alert>

          {/* File Selection */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Select Image File</label>
            <Input
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              disabled={uploading}
            />
            {file && (
              <div className="text-sm text-gray-600">
                Selected: {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
              </div>
            )}
          </div>

          {/* Upload Progress */}
          {progress && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Uploading...</span>
                <span>{progress.progress.toFixed(1)}%</span>
              </div>
              <Progress value={progress.progress} />
              <div className="text-xs text-gray-500">
                {(progress.bytesTransferred / 1024 / 1024).toFixed(2)} MB / 
                {(progress.totalBytes / 1024 / 1024).toFixed(2)} MB
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-2">
            <Button 
              onClick={handleUpload} 
              disabled={!file || uploading || !user}
              className="flex-1"
            >
              {uploading ? 'Uploading...' : 'Upload Test File'}
            </Button>
            <Button 
              onClick={handleDiagnostics} 
              variant="outline"
            >
              Run Diagnostics
            </Button>
          </div>

          {/* Results */}
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {result && (
            <Alert>
              <AlertDescription>
                <div className="space-y-2">
                  <div>Upload successful!</div>
                  <div className="text-xs font-mono bg-gray-100 p-2 rounded break-all">
                    {result}
                  </div>
                  <img 
                    src={result} 
                    alt="Uploaded" 
                    className="max-w-full max-h-48 object-contain rounded"
                  />
                </div>
              </AlertDescription>
            </Alert>
          )}

          {/* Diagnostics */}
          {diagnostics && (
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Storage Diagnostics</CardTitle>
              </CardHeader>
              <CardContent>
                <pre className="text-xs bg-gray-100 p-2 rounded overflow-auto">
                  {JSON.stringify(diagnostics, null, 2)}
                </pre>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>
    </div>
  );
}