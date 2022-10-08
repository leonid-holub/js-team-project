import { FetchService } from './base_fetch';
import { getStartPageMarkup } from './start_page-render';
import debounce from 'lodash.debounce';

const fetchFromAPI = new FetchService();
const searchField = document.querySelector('.header__input');

searchField.addEventListener('input', debounce(onSearchFildChange, 300));

function onSearchFildChange(e) {
  const eventName = e.target.value.trim();
  fetchFromAPI.config.params.keyword = eventName;

  console.log(fetchFromAPI.baseFetch(eventName));

  fetchFromAPI.baseFetch().then(response => {
    const cardList = document.querySelector('.cards__list');
    const result = response._embedded.events;
    cardList.innerHTML = '';
    getStartPageMarkup(result);
  });
}
