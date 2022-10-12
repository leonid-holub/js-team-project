import { closeModalBtn } from '../modal';
import { saveBasketOnLocalStorage } from './save_basket_on_local_storage';
import { totalPrice } from './basket_total_price';
import { createBasketEvents } from './create_bascket_events';

const modalBasket = document.querySelector('[data-modal-shopping-basket]');
const buyTicketBtn = document.querySelector('.modal-shopping-basket__btn-bye');

buyTicketBtn.addEventListener('click', onBuyTicket);

export function onOpenModalBasket() {
  closeModalBtn();
  saveBasketOnLocalStorage();
  createBasketEvents();
  const allPrice = document.querySelectorAll('[data-basket-price]');
  totalPrice(allPrice);
  modalBasket.classList.remove('is-hidden');
}
function onBuyTicket() {
  localStorage.removeItem('Events');
  modalBasket.classList.add('is-hidden');
}
