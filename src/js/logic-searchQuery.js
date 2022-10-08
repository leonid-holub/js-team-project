import { FetchService } from './base_fetch';
import { getStartPageMarkup, TEST } from './start_page-render';

import debounce from 'lodash.debounce';

const fetchFromAPI = new FetchService();
const searchField = document.querySelector('.header__input');

const onSearchFildChange = function (e) {
  const eventName = e.target.value.trim();
  fetchFromAPI.config.params.keyword = eventName;
  fetchFromAPI.baseFetch().then(response => {
    const cardList = document.querySelector('.cards__list');
    const result = response._embedded.events;
    cardList.innerHTML = '';
    getStartPageMarkup(result);
  });
};
searchField.addEventListener('input', debounce(onSearchFildChange, 300));
