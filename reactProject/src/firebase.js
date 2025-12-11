// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCeMdU9fD7BUP2nvzotus6cyyDg_CdVE8A",
  authDomain: "btsend-ab077.firebaseapp.com",
  projectId: "btsend-ab077",
  storageBucket: "btsend-ab077.firebasestorage.app",
  messagingSenderId: "853362754448",
  appId: "1:853362754448:web:3e9b6d088712d6e4d36915"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
