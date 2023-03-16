import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";

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
  measurementId: "G-8DFELP7208"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// get user details via jquery
$("#sign-up").click(function () {
  const email = $("#inputEmail").val();
  const firstName = $("#inputFirstName").val();
  const lastName = $("#inputLastName").val();
  const fullName = $("#inputFullName").val();
  const password = $("#password").val();
  console.log(`Sign up: ${email} ${password}`);

  CreateNewUser(email, password, firstName, lastName);
});

// create new user with firebase
function CreateNewUser(email, password, firstName, lastName) {
  const auth = getAuth();
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
    });
};

// check if user is signed in
const auth = getAuth();
onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    const uid = user.uid;
    window.location.href = "project.html";
    // ...
  } else {
    // User is signed out
    window.location.href = "login.html";
    // ...
  }
});
