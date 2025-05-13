import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

console.log("🔑 API Key:", import.meta.env.VITE_FIREBASE_API_KEY); // TEMPORARY DEBUG

const firebaseConfig = {
  apiKey: "AIzaSyAu3errHMPpPndp5dzNpiqopop0RVz9bPY",
  authDomain: "student-dashboard-b00ea.firebaseapp.com",
  databaseURL: "https://student-dashboard-b00ea-default-rtdb.firebaseio.com",
  projectId: "student-dashboard-b00ea",
  storageBucket: "student-dashboard-b00ea.firebasestorage.app",
  messagingSenderId: "5220042994",
  appId: "1:5220042994:web:e15283de04d46b97b0a86b",
  databaseURL: "https://student-dashboard-b00ea-default-rtdb.firebaseio.com"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
