const burger = document.querySelector('.menu');
const burgerContainer = document.querySelector('.burger-container');

burger.addEventListener('click', () => {
  burger.classList.toggle('active');
  burgerContainer.classList.toggle('burger-container-is-hidden');
});
