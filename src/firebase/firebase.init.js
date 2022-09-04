// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAuyPKInxyhUTsUSFoImZP619Yk1WbZTA8",
  authDomain: "dynamic-quiz-6cc32.firebaseapp.com",
  projectId: "dynamic-quiz-6cc32",
  storageBucket: "dynamic-quiz-6cc32.appspot.com",
  messagingSenderId: "720196885125",
  appId: "1:720196885125:web:a3bdfa0d657cf91aa1a7ec",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;
