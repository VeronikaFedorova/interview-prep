import { initializeApp, getApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBWoBPZsJ1XBVhCejI7uMsr1RkSyGmKO2A',
  authDomain: 'prepwise-bf51a.firebaseapp.com',
  projectId: 'prepwise-bf51a',
  storageBucket: 'prepwise-bf51a.firebasestorage.app',
  messagingSenderId: '224876739594',
  appId: '1:224876739594:web:43a9ae30a88f67463fb3f3',
  measurementId: 'G-M987XCP50K',
};

// Initialize Firebase
const app = !getApps.length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);
