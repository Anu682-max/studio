import { doc, getDoc } from 'firebase/firestore';
import { db } from './firebase/config';

/**
 * Get image URL/data regardless of storage method
 */
export const getImageUrl = async (imageReference: string): Promise<string> => {
  // Check if it's a Firestore reference
  if (imageReference.startsWith('firestore://')) {
    const docId = imageReference.replace('firestore://', '');
    try {
      const imageDoc = await getDoc(doc(db, 'images', docId));
      if (imageDoc.exists()) {
        const data = imageDoc.data();
        return data.data; // Return base64 data
      } else {
        console.error('Firestore image document not found:', docId);
        return '/placeholder-image.svg'; // Fallback placeholder
      }
    } catch (error) {
      console.error('Error fetching Firestore image:', error);
      return '/placeholder-image.svg';
    }
  }
  
  // Regular Firebase Storage URL or other URL
  return imageReference;
};

/**
 * React hook for getting image URLs
 */
import { useState, useEffect } from 'react';

export const useImageUrl = (imageReference: string | undefined) => {
  const [imageUrl, setImageUrl] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!imageReference) {
      setImageUrl('');
      return;
    }

    setLoading(true);
    setError(null);

    getImageUrl(imageReference)
      .then(url => {
        setImageUrl(url);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setImageUrl('/placeholder-image.svg');
        setLoading(false);
      });
  }, [imageReference]);

  return { imageUrl, loading, error };
};