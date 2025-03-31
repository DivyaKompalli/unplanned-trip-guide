import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDJlhGnVXf0AluCLE4k2TAONZMHaeOHrjw",
  authDomain: "trip-8dd24.firebaseapp.com",
  projectId: "trip-8dd24",
  storageBucket: "trip-8dd24.firebasestorage.app",
  messagingSenderId: "1073086034344",
  appId: "1:1073086034344:web:3e95b33869e7722346ed9d",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });

export { auth, googleProvider };
