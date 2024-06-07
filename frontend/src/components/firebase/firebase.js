// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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

export const storage=getStorage(app);
