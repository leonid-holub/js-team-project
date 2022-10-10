import { FetchService } from './base_fetch';
import { getStartPageMarkup } from './start_page-render';
import getTotalPages from '../js/get_total_pages';

import debounce from 'lodash.debounce';

const fetchFromAPI = new FetchService();
const searchField = document.querySelector('.header__input');

const onSearchFildChange = function (e) {
  const eventName = e.target.value.trim();
  fetchFromAPI.config.params.keyword = eventName;
  if (eventName.length < 2) {
    return;
  }
  fetchFromAPI.baseFetch().then(response => {
    const eventList = response.page.totalElements;
    if (eventList === 0) {
      return;
    }
    const cardList = document.querySelector('.cards__list');
    const result = response._embedded.events;
    cardList.innerHTML = '';
    getStartPageMarkup(result);
    getTotalPages(response.page.totalPages);
  });
};
searchField.addEventListener('input', debounce(onSearchFildChange, 300));
