import {initializeApp} from 'firebase/app'


const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: "student-dashboard-b00ea.firebasestorage.app",
  messagingSenderId: "5220042994",
  appId: "1:5220042994:web:e15283de04d46b97b0a86b",
  databaseUR: "https://student-dashboard-b00ea-default-rtdb.firebaseio.com"
};

export const app = initializeApp(firebaseConfig)


