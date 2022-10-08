import { FetchService } from './base_fetch';
import debounce from 'lodash.debounce';

const fetchService = new FetchService();
const searchField = document.querySelector('.header__input');

searchField.addEventListener('input', debounce(onSearchFildChange, 300));

function onSearchFildChange(e) {
  const eventName = e.target.value.trim();

  fetchService.config.params.keyword = eventName;

  fetchService.baseFetch(eventName);
}
