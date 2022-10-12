import { onSearchFildChange } from './logic-searchQuery';
import { FetchService } from './base_fetch';
import { getAnimation, removeListHidden, removeDiv } from './info-anim';
import { getStartPageMarkup } from './start_page-render';
import getTotalPages from '../js/get_total_pages';
import { pagesVerification } from './pages_verification';
import { getCountriesFromEvents } from './filter_country';

const resetCountries = document.querySelector('.header__cancel-circle');
const countrySearch = document.querySelector('.header__country .header__input');
const searchField = document.querySelector('.header__input');
const info = document.createElement('div');
const cardList = document.querySelector('.cards__list');
const cards = document.querySelector('.cards');
const fetchFromAPI = new FetchService();

resetCountries.addEventListener('click', () => {
  resetCountries.classList.add('is-hidden');
  countrySearch.value = '';
  onSearchFildChange2();
});

const onSearchFildChange2 = function (e) {
  const eventName = searchField.value.trim();
  fetchFromAPI.config.params.keyword = eventName;

  fetchFromAPI.baseFetch().then(response => {
    getAnimation(response, info, cardList, cards, eventName, e);

    const eventList = response.page.totalElements;

    if (eventList === 0) {
      return;
    }

    removeListHidden(cardList);
    const result = response._embedded.events;
    cardList.innerHTML = '';
    getStartPageMarkup(result);
    getTotalPages(pagesVerification(response));
    getCountriesFromEvents(result);
    removeDiv(info);
  });
};
