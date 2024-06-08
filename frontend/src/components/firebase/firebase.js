// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBAMHephKUZnT-JOu1KVRDItIvINLg0YeY",
  authDomain: "uploadingfile-ce041.firebaseapp.com",
  projectId: "uploadingfile-ce041",
  storageBucket: "uploadingfile-ce041.appspot.com",
  messagingSenderId: "402796745420",
  appId: "1:402796745420:web:e8d0d2be3abcb1fb3fe869",
  measurementId: "G-72GPY16FXJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const db = getFirestore(app);
const auth = getAuth(app);

export { storage, db, auth };
