document.addEventListener("DOMContentLoaded", function () {
  document
    .querySelector(".navbar-toggler")
    .addEventListener("click", function () {
      let navbar = document.querySelector(".navbar");
      let toggleMenu = document.querySelector(".navbar-toggler");
      let header = document.querySelector("#header");

      // Check if the navbar is expanded or collapsed
      const isExpanded = toggleMenu.getAttribute("aria-expanded") == "true";
      if (header) {
        if (isExpanded) {
          header.style.marginTop = "200px";
        } else {
          header.style.marginTop = "120px";
        }
      }
    });
});


// change navbar toggle icon when expanded
const navbarToggleBtn = document.querySelector("#navbarToggleBtn");

navbarToggleBtn.addEventListener("click", function () {
  navbarToggleBtn.classList.toggle("active");
  if (navbarToggleBtn.classList.contains("active")) {
    navbarToggleBtn.innerHTML = '<i class="fas fa-times icon-toggle"></i>';
  } else {
    navbarToggleBtn.innerHTML = '<span class="navbar-toggler-icon"></span>';
  }
});

// show or hide password
const togglePassword = document.querySelector("#toggle-password");
const password = document.querySelector("#password");

if (togglePassword) {
  togglePassword.addEventListener("click", function () {
    const type =
      password.getAttribute("type") === "password" ? "text" : "password";
    password.setAttribute("type", type);
    this.querySelector("i").classList.toggle("fa-eye");
    this.querySelector("i").classList.toggle("fa-eye-slash");
  });
}

// show or hide confirm password
const confirmPassword = document.querySelector("#confirm-password");
const togglePassword2 = document.querySelector("#toggle-password2");

if (togglePassword2) {
  togglePassword2.addEventListener("click", function () {
    const type =
      confirmPassword.getAttribute("type") === "password" ? "text" : "password";
    confirmPassword.setAttribute("type", type);
    this.querySelector("i").classList.toggle("fa-eye");
    this.querySelector("i").classList.toggle("fa-eye-slash");
  });
}

// signup form validation
const firstNameInput = document.querySelector("#inputFirstName");
const lastNameInput = document.querySelector("#inputLastName");
const emailInput = document.querySelector("#inputEmail");
const fullNameInput = document.querySelector("#inputFullName");
const passwordInput = document.querySelector("#password");
const confirmPasswordInput = document.querySelector("#confirm-password");
const signupButton = document.querySelector("#sign-up");

// get media query
const mediaQuery = window.matchMedia("(max-width: 576px)");

if (mediaQuery.matches) {
  console.log("media query matches");
  if (fullNameInput) {
    fullNameInput.addEventListener("input", validateSecondForm);
  }
  if (emailInput) {
    emailInput.addEventListener("input", validateSecondForm);
  }
  if (passwordInput) {
    passwordInput.addEventListener("input", validateSecondForm);
  }
} else {
  // validate form
  if (firstNameInput) {
    firstNameInput.addEventListener("input", validateForm);
  }
  if (lastNameInput) {
    lastNameInput.addEventListener("input", validateForm);
  }
  if (emailInput) {
    emailInput.addEventListener("input", validateForm);
  }
  if (passwordInput) {
    passwordInput.addEventListener("input", validatePasswords);
  }
  if (confirmPasswordInput) {
    confirmPasswordInput.addEventListener("input", validatePasswords);
  }
}

signupButton.disabled = true;

function validateForm() {
  if (
    firstNameInput.value === "" ||
    lastNameInput.value === "" ||
    emailInput.value === ""
  ) {
    signupButton.disabled = true;
  } else {
    validatePasswords();
  }
}

function validatePasswords() {
  if (
    passwordInput.value !== confirmPasswordInput.value ||
    passwordInput.value === "" ||
    confirmPasswordInput.value === ""
  ) {
    signupButton.disabled = true;
  } else {
    signupButton.disabled = false;
  }
}

function validateSecondForm() {
  if (
    fullNameInput.value === "" ||
    emailInput.value === "" ||
    passwordInput.value === ""
  ) {
    signupButton.disabled = true;
  } else {
    signupButton.disabled = false;
  }
}
