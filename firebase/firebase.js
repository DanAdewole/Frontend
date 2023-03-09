import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCoh6tiUh1bJzPNGVgvbn-A7NlzIkN6eF0",
  authDomain: "powerup-a5c2c.firebaseapp.com",
  projectId: "powerup-a5c2c",
  storageBucket: "powerup-a5c2c.appspot.com",
  messagingSenderId: "238467498375",
  appId: "1:238467498375:web:e15e6b98664fa30d345322",
  measurementId: "G-8DFELP7208"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);