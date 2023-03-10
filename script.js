document.addEventListener("DOMContentLoaded", function () {
  document
    .querySelector(".navbar-toggler")
    .addEventListener("click", function () {
      var navbar = document.querySelector(".navbar");
      var toggleMenu = document.querySelector(".navbar-toggler");
      var header = document.querySelector("#header");

      // Check if the navbar is expanded or collapsed
      const isExpanded = toggleMenu.getAttribute("aria-expanded") == "true";
      if (isExpanded) {
        header.style.marginTop = "200px";
      } else {
        header.style.marginTop = "120px";
      }
    });
});

const navbarToggleBtn = document.querySelector('#navbarToggleBtn');

navbarToggleBtn.addEventListener('click', function () {
  navbarToggleBtn.classList.toggle('active');
  if (navbarToggleBtn.classList.contains('active')) {
    navbarToggleBtn.innerHTML = '<i class="fas fa-times icon-toggle"></i>';
  } else {
    navbarToggleBtn.innerHTML = '<span class="navbar-toggler-icon"></span>';
  }
});


document.addEventListener('DOMContentLoaded', () => {

  const selectDrop = document.querySelector('#countries');
  // const selectDrop = document.getElementById('countries');


  fetch('http://restcountries.eu/rest/v2/all').then(res => {
    return res.json();
  }).then(data => {
    let output = "";
    data.forEach(country => {
      output += `
      
      <option value="${country.name}">${country.name}</option>`;
    })

    selectDrop.innerHTML = output;
  }).catch(err => {
    console.log(err);
  })


});
