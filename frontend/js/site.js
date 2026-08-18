document.addEventListener("DOMContentLoaded", function () {
  var burger = document.querySelector(".nav-burger");
  var nav = document.querySelector(".site-nav");
  if (!burger || !nav) return;

  burger.addEventListener("click", function () {
    var isOpen = nav.classList.toggle("is-open");
    burger.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });
});
