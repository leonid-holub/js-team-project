import { FetchService } from './base_fetch';

const refs = {
  cardList: document.querySelector('.cards__list'),
};

const fetchFromAPI = new FetchService();

startPageMarkup();

function startPageMarkup() {
  fetchFromAPI.baseFetch().then(response => {
    getStartPageMarkup(response._embedded.events);
  });
}

function getStartPageMarkup(events) {
  const markup = events
    .map(event => {
      return `
    <li class="cards__item">
        <div class="cards__link" href="" data-modal-open>
        <img class="cards__img" src="${event.images[4].url}" alt="event-pictures" width="267px" height="220px"/> 
        <h3 class="cards__title">${event.name}</h3>
        </div>
        <p class="cards__date">
          <time datetime="${event.dates.start.dateTime}">${event.dates.start.localDate}</time>
        </p>
        <a class="cards__address">
          <svg class="cards__icon-location" width="6" height="9">
            <use href="../images/icons/icons.svg"></use>
          </svg>
          <span>${event._embedded.venues[0].name}</span></a>
      </li>
`;
    })
    .join('');

  refs.cardList.insertAdjacentHTML('afterbegin', markup);
}
