// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyBAMHephKUZnT-JOu1KVRDItIvINLg0YeY",
//   authDomain: "uploadingfile-ce041.firebaseapp.com",
//   projectId: "uploadingfile-ce041",
//   storageBucket: "uploadingfile-ce041.appspot.com",
//   messagingSenderId: "402796745420",
//   appId: "1:402796745420:web:e8d0d2be3abcb1fb3fe869",
//   measurementId: "G-72GPY16FXJ"
// };

const firebaseConfig = {
  apiKey: "AIzaSyAcVhIFuEY9d03Q4xDCK6BtxJC5vrtyo5U",
  authDomain: "jobportal-a7375.firebaseapp.com",
  projectId: "jobportal-a7375",
  storageBucket: "jobportal-a7375.firebasestorage.app",
  messagingSenderId: "489863477053",
  appId: "1:489863477053:web:7519b97f7ae6769415b754",
  measurementId: "G-6WVS69SL7F",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const db = getFirestore(app);
const auth = getAuth(app);

export { storage, db, auth };
