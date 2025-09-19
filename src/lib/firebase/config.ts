import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "studio-3378510862-a72aa",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:185419459053:web:1522e04ffa46c63fa81fe4",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "studio-3378510862-a72aa.appspot.com",
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyD_4xuoLFA2FlqPioQ_DTi7V-lvrm5tTew",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "studio-3378510862-a72aa.firebaseapp.com",
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || "",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "185419459053"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// Configure storage with timeout settings
storage.maxUploadRetryTime = 120000; // 2 minutes
storage.maxOperationRetryTime = 120000; // 2 minutes

export { app, auth, db, storage };
