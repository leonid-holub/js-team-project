const favoritesEvents = document.querySelector('.modal-favorites__info');

export  function createBasketEvents() {
  const objEvent = JSON.parse(localStorage.getItem('Events'));
  const newEvent = objEvent
    .map(
      (obj, index) => `<ul class="modal-favorites__info-events">
        <li class="modal-favorites__info-events-elem"><img class="modal-favorites__info-events-img" src="${obj.imgEvent}" alt="${obj.name}" width="60" ></img></li>
        <li class="modal-favorites__info-events-elem">${obj.name}</li>
        <li class="modal-favorites__info-events-elem">${obj.country}</li>
        <li class="modal-favorites__info-events-elem">${obj.city}</li>
        <li class="modal-favorites__info-events-elem" data-basket-price>${obj.dataEvents}</li>
        <li class="modal-favorites__info-events-elem"><a class="modal-favorites__info-link" href="${obj.urlBuyTicket}">BUY TICKET</a></li>
        <li class="modal-favorites__info-events-elem"><button class="modal-favorites__info-link" data="${index}" data-favorites-delete>DELETE</button></li>
      </ul>`
    )
    .join('');
  favoritesEvents.innerHTML = newEvent;
}
