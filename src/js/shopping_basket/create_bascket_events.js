const basketEvents = document.querySelector(
  '.modal-shopping-basket__container-events'
);
let event;

export function createBasketEvents() {
  const objEvent = JSON.parse(localStorage.getItem('Events'));
  const newEvent = objEvent
    .map(
      obj => `<ul class="modal-shopping-basket__info-events">
          <li class="modal-shopping-basket__info-events-elem">${obj.name}</li>
          <li class="modal-shopping-basket__info-events-elem">${obj.country}</li>
          <li class="modal-shopping-basket__info-events-elem" data-basket-price>${obj.price}</li>
          <li class="modal-shopping-basket__info-events-elem">1</li>
        </ul>`
    )
    .join('');
  basketEvents.innerHTML = newEvent;
}
