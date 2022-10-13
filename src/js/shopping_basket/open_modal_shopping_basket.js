import { onDeleteBtn } from './modal_shopping_basket';

import { createBasketEvents } from './create_bascket_events';

const modalFavorites = document.querySelector('[data-modal-favorites]');

export function onOpenModalFavorites() {
  modalFavorites.classList.remove('is-hidden');
  createBasketEvents();
  const myFavorites = document.querySelector('.modal-favorites__info');
  myFavorites.addEventListener('click', onDeleteBtn);
}
