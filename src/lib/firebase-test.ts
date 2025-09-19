// Simple Firebase connectivity test
// Add this to your browser console to test Firebase connectivity

import { auth, db, storage } from '@/lib/firebase/config';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import { ref, listAll } from 'firebase/storage';

export const testFirebaseConnection = async () => {
  console.log('=== Firebase Connectivity Test ===');
  
  // Test 1: Check Authentication
  console.log('1. Authentication Status:', auth.currentUser ? 'Logged in' : 'Not logged in');
  if (auth.currentUser) {
    console.log('   User email:', auth.currentUser.email);
  }
  
  // Test 2: Test Firestore connection
  try {
    console.log('2. Testing Firestore...');
    const testCollection = collection(db, 'news');
    const snapshot = await getDocs(testCollection);
    console.log('   Firestore: SUCCESS - Found', snapshot.size, 'documents');
  } catch (error) {
    console.error('   Firestore: FAILED -', error);
  }
  
  // Test 3: Test Storage connection
  try {
    console.log('3. Testing Storage...');
    const storageRef = ref(storage);
    const result = await listAll(storageRef);
    console.log('   Storage: SUCCESS - Found', result.items.length, 'files');
  } catch (error) {
    console.error('   Storage: FAILED -', error);
  }
  
  // Test 4: Test adding a document (if authenticated)
  if (auth.currentUser) {
    try {
      console.log('4. Testing write permissions...');
      const testDoc = {
        test: true,
        timestamp: new Date().toISOString(),
        user: auth.currentUser.email
      };
      await addDoc(collection(db, 'test'), testDoc);
      console.log('   Write test: SUCCESS');
    } catch (error) {
      console.error('   Write test: FAILED -', error);
    }
  }
  
  console.log('=== Test Complete ===');
};

// Run the test
if (typeof window !== 'undefined') {
  testFirebaseConnection();
}