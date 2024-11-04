import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAuth, GoogleAuthProvider } from 'https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js';


const FIREBASE_CONFIG = JSON.parse(import.meta.env.VITE_FIREBASE_CONFIG);

export const app = initializeApp(FIREBASE_CONFIG);
export const auth = getAuth(app);
export const GoogleProvider = new GoogleAuthProvider();