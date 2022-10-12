import { createBasketEvents } from './create_bascket_events';
import { onOpenModalFavorites } from './open_modal_shopping_basket';
import { saveBasketOnLocalStorage } from './save_basket_on_local_storage';

const closeModalFavorites = document.querySelector(
  '[data-modal-favorites-close]'
);
const modalFavorites = document.querySelector('[data-modal-favorites]');
const openModalFavorites = document.querySelector(
  '[data-open-modal-favorites]'
);
const addToFavorites = document.querySelector('[data-modal-favorites-add]');
const myFavorites = document.querySelector('.modal-favorites__info');
let allEvents = [];
let basketLocalStorage;

openModalFavorites.addEventListener('click', onOpenModalFavorites);
closeModalFavorites.addEventListener('click', onCloseModalBasket);
addToFavorites.addEventListener('click', onAddToFavorites);
myFavorites.addEventListener('click', onDeleteBtn);

export function onDeleteBtn(e) {
  if (!e.target.hasAttribute('data-favorites-delete')) {
    return;
  }
  basketLocalStorage = localStorage.getItem('Events');
  allEvents = JSON.parse(basketLocalStorage);
  allEvents.splice(e.target.getAttribute('data'), 1);
  localStorage.setItem('Events', JSON.stringify(allEvents));
  createBasketEvents();
}

function onCloseModalBasket() {
  modalFavorites.classList.add('is-hidden');
}

modalFavorites.addEventListener('click', closeModalFavBack);
function closeModalFavBack(ev) {
  if (ev.target === modalFavorites) {
    modalFavorites.classList.add('is-hidden');
  } else {
    return;
  }
}

window.addEventListener('keydown', closeModalFavKey);
function closeModalFavKey(ev) {
  if (ev.code === 'Escape') {
    modalFavorites.classList.add('is-hidden');
  }
}

function onAddToFavorites() {
  saveBasketOnLocalStorage();
}
if (localStorage.getItem('Events') === null) {
  return;
} else {
  createBasketEvents();
}
