import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: 'recipe-blog-42d5b.firebaseapp.com',
  projectId: 'recipe-blog-42d5b',
  storageBucket: 'recipe-blog-42d5b.appspot.com',
  messagingSenderId: '225908636983',
  appId: '1:225908636983:web:ed688711ba652dc3d8aeb2',
};

export const app = initializeApp(firebaseConfig);
