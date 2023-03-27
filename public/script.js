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
  if (fullNameInput) {
    fullNameInput.addEventListener("input", validateSecondForm);
  }
  if (emailInput) {
    emailInput.addEventListener("input", validateSecondForm);
  }
  if (passwordInput) {
    passwordInput.addEventListener("input", validatePasswords);
  }
  if (confirmPasswordInput) {
    confirmPasswordInput.addEventListener("input", validatePasswords);
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
  if (fullNameInput.value === "" || emailInput.value === "") {
    signupButton.disabled = true;
  } else {
    signupButton.disabled = false;
  }
}

// countries javascript
const countriesList = document.getElementById("countries");
let countries; // will contain "fetched" data

countriesList.addEventListener("change", newCountrySelection);

function newCountrySelection(event) {
  displayCountryInfo(event.target.value);
}

fetch("https://restcountries.com/v3.1/all")
  .then((res) => res.json())
  .then((data) => initializeCountries(data))
  .catch((err) => console.log("Error:", err));

function initializeCountries(countriesData) {
  countries = countriesData;
  // sort out the countries data
  countries.sort((a, b) => a.name.common.localeCompare(b.name.common)); // sort countries alphabetically by name
  let options = "";
  countries.forEach(
    (country) =>
      (options += `<option value="${country.cca2}"><img src="${country.flag}" alt="country's flag">${country.flag}  ${country.name.common}</option>`)
  );
  countriesList.innerHTML = options;

  // set nigeria as the default
  const nigeriaIndex = 159;
  const nigeriaCca2 = countries[nigeriaIndex].cca2;
  countriesList.value = nigeriaCca2;
}

// numbers javascript
const numbersList = document.getElementById("numbers");
const numberInput = document.getElementById("inputNumber");
let numbers; // will contain "fetched" data

numbersList.addEventListener("change", newNumberSelection);

function newNumberSelection(event) {
  displayNumberInfo(event.target.value);
}

fetch("https://restcountries.com/v3.1/all")
  .then((res) => res.json())
  .then((data) => initializeCodes(data))
  .catch((err) => console.log("Error:", err));

function initializeCodes(data) {
  numbers = data;
  // sort out the numbers data
  numbers.sort((a, b) => a.name.common.localeCompare(b.name.common)); // sort numbers alphabetically by name
  let options = "";
  numbers.forEach((number) => {
    let countryCodeInitial = number.idd.root;
    let countryCodeEnd;
    if (!countryCodeInitial) {
      countryCodeInitial = "";
    }
    if (Array.isArray(number.idd.suffixes)) {
      countryCodeEnd = number.idd.suffixes[0];
      if (!countryCodeEnd) {
        countryCodeEnd = "";
      }
    } else {
      countryCodeEnd = "";
    }

    let countryCode = countryCodeInitial + countryCodeEnd;
    // console.log(countryCodeInitial + countryCodeEnd);
    options += `<option value="${countryCode}">${number.flag}</option>`;
  });
  numbersList.innerHTML = options;

  // set nigeria as the default
  const nigeriaIndex = 159;
  const nigeriaCode =
    numbers[nigeriaIndex].idd.root + numbers[nigeriaIndex].idd.suffixes[0];
  numbersList.value = nigeriaCode;
  numberInput.value = nigeriaCode;

  // add country code
  numbersList.addEventListener("change", () => {
    const countryPhoneCode = numbersList.value;
    numberInput.value = countryPhoneCode;
  });
}
