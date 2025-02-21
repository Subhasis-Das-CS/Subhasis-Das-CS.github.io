// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBmRPY00oRJOh9qIYoQ8dKxBMPsjKO3x5Y",
  authDomain: "quizapp-8565e.firebaseapp.com",
  projectId: "quizapp-8565e",
  storageBucket: "quizapp-8565e.firebasestorage.app",
  messagingSenderId: "99063776145",
  appId: "1:99063776145:web:7efced050e3ecb572d1030",
  measurementId: "G-8HZGTCZ78D",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;
