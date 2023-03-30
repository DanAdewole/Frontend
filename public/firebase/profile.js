import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getFirestore,
  collection,
  getDoc,
  doc,
  setDoc,
} from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

// // set up dotenv
// const dotenv = require('dotenv');
// const path = require('path');

// dotenv.config({ path: path.resolve(__dirname, '.env') });

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCoh6tiUh1bJzPNGVgvbn-A7NlzIkN6eF0",
  authDomain: "powerup-a5c2c.firebaseapp.com",
  projectId: "powerup-a5c2c",
  storageBucket: "powerup-a5c2c.appspot.com",
  messagingSenderId: "238467498375",
  appId: "1:238467498375:web:e15e6b98664fa30d345322",
  measurementId: "G-8DFELP7208",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

// Get the current user
const auth = getAuth();
onAuthStateChanged(auth, (user) => {
  // Check if a user is signed in
  if (user) {
    // User is signed in
    const userId = user.uid;

    // Get a reference to the Firestore collection containing the user's information
    const usersCollection = doc(db, "users", userId);

    // Get the document containing the user's information
    getDoc(usersCollection)
      .then((doc) => {
        if (doc.exists()) {
          // User's information exists
          const userData = doc.data();
          $("h1").text(`Hello, ${userData.firstName}`);
          console.log(userData);
        } else {
          // User's information doesn't exist
          console.log("User's information doesn't exist");
        }
      })
      .catch((error) => {
        console.log("Error getting user's information:", error);
      });
  } else {
    // No user is signed in
    console.log("No user is signed in");
  }
});
