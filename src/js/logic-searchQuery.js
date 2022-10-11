import { FetchService } from './base_fetch';
import { getStartPageMarkup } from './start_page-render';
import getTotalPages from '../js/get_total_pages';
import { getCountriesFromEvents } from './filter_country';
import { pagesVerification } from './pages_verification';
import debounce from 'lodash.debounce';

const fetchFromAPI = new FetchService();
const searchField = document.querySelector('.header__input');

const onSearchFildChange = function (e) {
  const eventName = e.target.value.trim();
  fetchFromAPI.config.params.keyword = eventName;

  fetchFromAPI.baseFetch().then(response => {
    const eventList = response.page.totalElements;
    if (eventList === 0) {
      return;
    }
    const cardList = document.querySelector('.cards__list');
    const result = response._embedded.events;
    cardList.innerHTML = '';
    getStartPageMarkup(result);
    getTotalPages(pagesVerification(response));
    getCountriesFromEvents(result);
  });
};
searchField.addEventListener('input', debounce(onSearchFildChange, 300));
