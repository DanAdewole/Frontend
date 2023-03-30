import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getFirestore,
  collection,
  addDoc,
  doc,
  setDoc,
} from "firebase/firestore";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  sendEmailVerification,
} from "firebase/auth";

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
// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

// get user details via jquery
// on signup button click
$("#sign-up").click(function () {
  const email = $("#inputEmail").val();
  const firstName = $("#inputFirstName").val();
  const lastName = $("#inputLastName").val();
  const fullName = $("#inputFullName").val();
  const country = $("#countries :selected").val();
  const phoneNumber = $("#inputNumber").val();
  const password = $("#password").val();
  const nameError = document.querySelector("#name-error");
  const emailError = document.querySelector("#email-error");
  const passwordError = document.querySelector("#password-error");

  console.log(country);
  console.log(phoneNumber);

  const mediaQuery = window.matchMedia("(max-width: 576px)");

  if (mediaQuery.matches) {
    const [firstName, lastName] = fullName.split(" ");
    createNewUser(
      email,
      password,
      firstName,
      lastName,
      country,
      phoneNumber,
      emailError,
      passwordError
    );
  } else {
    createNewUser(
      email,
      password,
      firstName,
      lastName,
      country,
      phoneNumber,
      emailError,
      passwordError
    );
  }
});

// on logout button click
$("#logout-button").click(function () {
  SignOut();
});

// on sign in button click
$("#sign-in-button").click(function () {
  const email = $("#input-email").val();
  const password = $("#input-password").val();
  const emailError = document.querySelector("#email-error");
  const passwordError = document.querySelector("#password-error");

  SignInUser(email, password, emailError, passwordError);
});

$("#dashboard-link").click(redirectToDashboard);

// redirect to dashboard
function redirectToDashboard(event) {
  event.preventDefault();
  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, so redirect to the dashboard page
      window.location.href = "project.html";
    } else {
      // User is not signed in, so redirect to the login page
      window.location.href = "login.html";
    }
  });
}

// save user details to firestore
async function saveUserDetails(
  firstName,
  lastName,
  email,
  country,
  phoneNumber
) {
  try {
    const docRef = await addDoc(collection(db, "users"), {
      firstName: firstName,
      lastName: lastName,
      email: email,
      country: country,
      phoneNumber: phoneNumber,
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}


// create new users and save their info to db
function createNewUser(
  email,
  password,
  firstName,
  lastName,
  country,
  phoneNumber,
  emailError,
  passwordError
) {
  // Reset error messages
  emailError.textContent = "";
  passwordError.textContent = "";

  // create new user
  const auth = getAuth();
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log(user.email);

      const actionCodeSettings = {
        url: "https://powerup-a5c2c.firebaseapp.com/login.html",
        handleCodeInApp: true,
      };

      // save user to database
      saveUserDetails(firstName, lastName, email, country, phoneNumber)
        .then(() => {
          // redirect to appropriate page based on verification status
          if (user.emailVerified) {
            window.location.href = "project.html";
          } else {
            sendEmailVerification(auth.currentUser, actionCodeSettings)
              .then(() => {
                console.log("Verification email sent");
                window.location.href = "verify.html";
              })
              .catch((error) => {
                console.log(error);
                passwordError.textContent = "Error sending verification email";
              });
          }
        })
        .catch((error) => {
          console.log(error);
          passwordError.textContent = "Error saving user details";
        });
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;

      // Display error message
      switch (errorCode) {
        case "auth/email-already-in-use":
          emailError.textContent = "Email already in use";
          break;
        case "auth/invalid-email":
          emailError.textContent = "Invalid email";
          break;
        case "auth/missing-email":
          emailError.textContent = "Enter your email";
        case "auth/weak-password":
          passwordError.textContent = "Password must be at least 6 characters";
          break;
        case "auth/internal-error":
          passwordError.textContent = "Enter your password";
          break;
        default:
          console.log(errorCode, errorMessage);
          passwordError.textContent = "Unknown error occurred";
      }
    });
}

// sign in user with firebase
function SignInUser(email, password, emailError, passwordError) {
  // Reset error messages
  emailError.textContent = "";
  passwordError.textContent = "";

  const auth = getAuth();
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;

      // display error message
      switch (errorCode) {
        case "auth/invalid-email":
          emailError.textContent = "Enter a valid email";
          break;
        case "auth/user-disabled":
          emailError.textContent = "User disabled";
          break;
        case "auth/user-not-found":
          emailError.textContent = "User not found";
          break;
        case "auth/internal-error":
          passwordError.textContent = "Enter password or check connection";
          break;
        case "auth/wrong-password":
          passwordError.textContent = "Wrong password";
          break;
        default:
          console.log(errorCode, errorMessage);
      }
    });
}

// sign out user with firebase
function SignOut() {
  const auth = getAuth();
  signOut(auth)
    .then(() => {
      // Sign-out successful.
      window.location.href = "index.html";
      console.log("logout successful");
    })
    .catch((error) => {
      // An error happened.
    });
}

// check if user is signed in
const auth = getAuth();
const allowedPages = ["project.html", "profile.html"];

onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    const uid = user.uid;
    // Check if the user is not already on the project.html page

    if (user.emailVerified) {
      // User's email is verified, redirect to project page
      const currentPage = window.location.href.split("/").pop();

      if (!allowedPages.includes(currentPage)) {
        window.location.href = "project.html";
      }
        
      // if (window.location.href.indexOf("project.html") === -1) {
      //   window.location.href = "project.html";
      // }
        
    } else {
      //   // User's email is not verified, redirect to verification page
      console.log("email not verified");
      if (
        window.location.href.indexOf("verify.html") === -1 &&
        window.location.href.indexOf("signup.html") === -1
      ) {
        window.location.href = "verify.html";
        console.log("email is not verified");
      }
      // ...
      // ...
    }
  } else {
    // User is signed out
    // Redirect to login.html if the user is not already there
    console.log("user is signed out");
    if (
      window.location.href.indexOf("index.html") === -1 &&
      window.location.href.indexOf("signup.html") === -1 &&
      window.location.href.indexOf("login.html") === -1 &&
      window.location.href.indexOf("about.html") === -1
    ) {
      window.location.href = "index.html";
      // ...
    }
  }
});
