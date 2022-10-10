import { FetchService } from './base_fetch';
import { onCardModalOpen } from './modal';
import getTotalPages from '../js/get_total_pages';

const refs = {
  cardList: document.querySelector('.cards__list'),
};

const fetchFromAPI = new FetchService();

const svgIconLocation = `<svg width="8" height="10" viewBox="0 0 8 10" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M3.77344 0C1.69278 0 0 1.55933 0 3.47595C0 5.88495 3.77715 10 3.77715 10C3.77715 10 7.54687 5.76648 7.54687 3.47595C7.54687 1.55933 5.85416 0 3.77344 0ZM4.91196 4.49371C4.59803 4.78284 4.18577 4.92743 3.77344 4.92743C3.36118 4.92743 2.94878 4.78284 2.63498 4.49371C2.00718 3.91547 2.00718 2.97455 2.63498 2.39624C2.93897 2.11609 3.34335 1.96179 3.77344 1.96179C4.20352 1.96179 4.60783 2.11615 4.91196 2.39624C5.53976 2.97455 5.53976 3.91547 4.91196 4.49371Z" fill="white"/>
</svg>`;

let sortPicturesByWidth = null;

startPageMarkup();

function startPageMarkup() {
  fetchFromAPI.baseFetch().then(response => {
    getStartPageMarkup(response._embedded.events);
    getTotalPages(response.page.totalPages);
  });
}

export function getStartPageMarkup(events) {
  const markup = events
    .map(event => {
      sortPicturesByWidth = event.images.sort((a, b) => b.width - a.width);

      if (event._embedded.venues[0].location !== undefined) {
        return `
    <li class="cards__item">
        <div class="cards__link" data-id = "${event.id}">
        <img class="cards__img" src="${sortPicturesByWidth[0].url}" alt="event-pictures" width="267px" height="220px"/> 
        <h3 class="cards__title">${event.name}</h3>
        </div>
        <p class="cards__date">
          <time datetime="${event.dates.start.dateTime}">${event.dates.start.localDate}</time>
        </p>
        <a class="cards__address" href="https://www.google.com/maps/place/${event._embedded.venues[0].location.latitude} ${event._embedded.venues[0].location.longitude}" target="_blank">
         ${svgIconLocation}
          <span>${event._embedded.venues[0].name}</span></a>
      </li>`;
      } else {
        return `
    <li class="cards__item">
        <div class="cards__link" data-id = "${event.id}">
        <img class="cards__img" src="${sortPicturesByWidth[0].url}" alt="event-pictures" width="267px" height="220px"/> 
        <h3 class="cards__title">${event.name}</h3>
        </div>
        <p class="cards__date">
          <time datetime="${event.dates.start.dateTime}">${event.dates.start.localDate}</time>
        </p>
          <span class="cards__address--missing">${event._embedded.venues[0].name}</span></a>
      </li>`;
      }
    })
    .join('');

  refs.cardList.insertAdjacentHTML('afterbegin', markup);

  const cards = document.querySelectorAll('.cards__link');
  cards.forEach(card => card.addEventListener('click', onCardModalOpen));
}
