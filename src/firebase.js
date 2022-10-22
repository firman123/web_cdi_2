import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

let firebaseConfig = {
  apiKey: "AIzaSyAx15FXXCDh5CSwwJ-9SAWAnsjpiuL5jMA",
  authDomain: "cdi-web.firebaseapp.com",
  projectId: "cdi-web",
  storageBucket: "cdi-web.appspot.com",
  messagingSenderId: "613187569096",
  appId: "1:613187569096:web:c2d44654705484c65eacfd",
  measurementId: "G-39D2NCJ0NB",
};

// Initialize Firebase and Firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
