const favoritesEvents = document.querySelector('.modal-favorites__info');
const binIcon = `<svg class="btn-del-icon" width="20" height="20" viewBox="0 0 44 32" data-favorites-delete-icon xmlns="http://www.w3.org/2000/svg"><path data-favorites-delete-icon d="M4 10v20c0 1.1 0.9 2 2 2h18c1.1 0 2-0.9 2-2v-20h-22zM10 28h-2v-14h2v14zM14 28h-2v-14h2v14zM18 28h-2v-14h2v14zM22 28h-2v-14h2v14z"></path>
<path data-favorites-delete-icon d="M26.5 4h-6.5v-2.5c0-0.825-0.675-1.5-1.5-1.5h-7c-0.825 0-1.5 0.675-1.5 1.5v2.5h-6.5c-0.825 0-1.5 0.675-1.5 1.5v2.5h26v-2.5c0-0.825-0.675-1.5-1.5-1.5zM18 4h-6v-1.975h6v1.975z"></path>
</svg>`;

export function createBasketEvents() {
  const objEvent = JSON.parse(localStorage.getItem('Events'));
  if (objEvent.length > 0) {
    const newEvent = objEvent
      .map(
        (obj, index) => `<ul class="modal-favorites__info-events">
        <li class="modal-favorites__info-events-elem"><img class="modal-favorites__info-events-img" src="${obj.imgEvent}" alt="${obj.name}" width="60" ></img></li>
        <li class="modal-favorites__info-events-elem">${obj.name}</li>
        <li class="modal-favorites__info-events-elem">${obj.country}</li>
        <li class="modal-favorites__info-events-elem">${obj.city}</li>
        <li class="modal-favorites__info-events-elem" data-basket-price>${obj.dataEvents}</li>
        <li class="modal-favorites__info-events-elem"><a class="modal-favorites__info-link" href="${obj.urlBuyTicket}" target="_blank" target="_blank" rel="noreferrer noopener">BUY TICKET</a></li>
        <li class="modal-favorites__info-events-elem"><button class="modal-favorites__btn-del" data="${index}" data-favorites-delete>${binIcon}</button></li>
      </ul>`
      )
      .join('');
    favoritesEvents.innerHTML = newEvent;
  } else {
    const withoutEvents =
      '<p class="modal__favorites--clear">You currently have no favorite events</p>';
    favoritesEvents.innerHTML = withoutEvents;
  }
}
