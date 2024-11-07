import { initializeApp } from "firebase/app";
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-f8f18.firebaseapp.com",
  projectId: "mern-estate-f8f18",
  storageBucket: "mern-estate-f8f18.appspot.com",
  messagingSenderId: "304767473129",
  appId: "1:304767473129:web:e67df8378b70567db42778"
};

export const app = initializeApp(firebaseConfig);