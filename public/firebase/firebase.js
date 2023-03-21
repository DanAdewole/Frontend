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
  applyActionCode,
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
  const password = $("#password").val();
  const nameError = document.querySelector("#name-error");
  const emailError = document.querySelector("#email-error");
  const passwordError = document.querySelector("#password-error");

  const mediaQuery = window.matchMedia("(max-width: 576px)");

  if (mediaQuery.matches) {
    const [firstName, lastName] = fullName.split(" ");
    createNewUser(
      email,
      password,
      firstName,
      lastName,
      emailError,
      passwordError
    );
  } else {
    createNewUser(
      email,
      password,
      firstName,
      lastName,
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

// // resend verification email
// const sendEmailLink = document.querySelector("#verify-email");

// sendEmailLink.addEventListener("click", () => {
//   console.log("email send")
//   verifyEmail(auth.currentUser);
// });

// // send verification email
// function verifyEmail(user) {
//   sendEmailVerification(user).then(() => {
//     // Email verification sent!
//     console.log("email sent");
//     // ...
//   });
// }

// create new user with firebase
function createNewUser(
  email,
  password,
  firstName,
  lastName,
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

      sendEmailVerification(auth.currentUser, { handleCodeInApp: true })
        .then(() => {
          // Verification email sent.
          console.log("Verification email sent");
          applyActionCode().then(() => {
            console.log("Email verified successfully");

            saveUserDetails(firstName, lastName, email);
            console.log("send documents to save");

            // Redirect user to project page
            if (window.location.href.indexOf("login.html") === -1) {
              window.location.href = "login.html";
            }
          });
        })
        .catch((error) => {
          // Error occurred. Inspect error.code.
          console.log(error);
        });

      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;

      // display error message
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
          passwordError.textContent = "Ener your password";
          break;
        default:
          console.log(errorCode, errorMessage);
      }
      // ..
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
          passwordError.textContent = "Enter your password";
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
onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    const uid = user.uid;
    // Check if the user is not already on the project.html page

    console.log("authentication running");

    let emailVerified = false;

    if (user.emailVerified) {
      emailVerified = true;
      // ...
    }

    if (emailVerified) {
      // User's email was just verified, redirect to project page
      console.log("email just verified");
      window.location.href = "login.html";
    } else if (user.emailVerified) {
      // User's email is verified, redirect to project page
      console.log("email verified");
      if (window.location.href.indexOf("project.html") === -1) {
        window.location.href = "project.html";
      }
    } else {
      // User's email is not verified, redirect to verification page
      console.log("email not verified");
      if (window.location.href.indexOf("verify.html") === -1) {
        window.location.href = "verify.html";
        console.log("email is not verified");
      }
    }
    // ...
    // ...
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

// save user details to firestore
async function saveUserDetails(firstName, lastName, email) {
  try {
    const docRef = await addDoc(collection(db, "users"), {
      firstName: firstName,
      lastName: lastName,
      email: email,
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}
