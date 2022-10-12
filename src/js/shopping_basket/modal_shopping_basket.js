import { createBasketEvents } from './create_bascket_events';

const closeModalBasket = document.querySelector(
  '.modal-shopping-basket__btn-close'
);
const modalBasket = document.querySelector('[data-modal-shopping-basket]');
closeModalBasket.addEventListener('click', onCloseModalBasket);

function onCloseModalBasket() {
  modalBasket.classList.add('is-hidden');
}

if (localStorage.getItem('Events') === null) {
  return;
} else {
  createBasketEvents();
}
