document.addEventListener("DOMContentLoaded", function () {
	document
	  .querySelector(".navbar-toggler")
	  .addEventListener("click", function () {
		var navbar = document.querySelector(".navbar");
		var toggleMenu = document.querySelector(".navbar-toggler");
		var header = document.querySelector(".header");
  
		// Check if the navbar is expanded or collapsed
		const isExpanded = toggleMenu.getAttribute("aria-expanded") == "true";
		if (isExpanded) {
		  header.style.marginTop = "190px";
		} else {
		  header.style.marginTop = "105px";
		}
	  });
  });
  
  