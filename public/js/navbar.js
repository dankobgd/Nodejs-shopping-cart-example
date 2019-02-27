/* eslint no-undef: "off" */

document.addEventListener('DOMContentLoaded', () => {
  const navbarBurgers = Array.from(document.querySelectorAll('.navbar-burger'));

  if (navbarBurgers.length > 0) {
    navbarBurgers.forEach(el => {
      el.addEventListener('click', () => {
        const target = document.getElementById(el.dataset.target);
        el.classList.toggle('is-active');
        target.classList.toggle('is-active');
      });
    });
  }
});
