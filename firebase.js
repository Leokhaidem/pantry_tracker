// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyClLpLQGJNvP_h4gXXx9_GKqsepnAhWfM0",
  authDomain: "pantry-app-d1e16.firebaseapp.com",
  projectId: "pantry-app-d1e16",
  storageBucket: "pantry-app-d1e16.appspot.com",
  messagingSenderId: "765158760046",
  appId: "1:765158760046:web:40ec86693acebdec74507f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);

export { app, auth, db };
