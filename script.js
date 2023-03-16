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
