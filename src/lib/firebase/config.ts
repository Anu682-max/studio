import { initializeApp, getApps, getApp } from 'firebase/app';

const firebaseConfig = {
  "projectId": "studio-3378510862-a72aa",
  "appId": "1:185419459053:web:1522e04ffa46c63fa81fe4",
  "storageBucket": "studio-3378510862-a72aa.firebasestorage.app",
  "apiKey": "AIzaSyD_4xuoLFA2FlqPioQ_DTi7V-lvrm5tTew",
  "authDomain": "studio-3378510862-a72aa.firebaseapp.com",
  "measurementId": "",
  "messagingSenderId": "185419459053"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export { app };
