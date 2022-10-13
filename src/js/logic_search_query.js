import { FetchService } from './base_fetch';
import { getStartPageMarkup } from './start_page_render';
import getTotalPages from './get_total_pages';
import { getCountriesFromEvents } from './filter_country';
import { suppCountries } from './all_supp_countries';
import { pagesVerification } from './pages_verification';

import {
  getAnimationEventSearch,
  removeListHidden,
  removeDiv,
} from './info_anim';

import debounce from 'lodash.debounce';

const fetchFromAPI = new FetchService();
const searchField = document.querySelector('.header__input');
const countrySearch = document.querySelector('.header__country .header__input');
const cardList = document.querySelector('.cards__list');
const cards = document.querySelector('.cards');

const info = document.createElement('div');

export const onSearchFildChange = function (e) {
  const eventName = e.target.value.trim();
  fetchFromAPI.config.params.keyword = eventName;

  if (countrySearch.value.trim() === '') {
    fetchFromAPI.baseFetch().then(response => {
      getAnimationEventSearch(response, info, cardList, cards, eventName, e);

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
  } else {
    fetchFromAPI.config.params.countryCode = suppCountries.getKeyForValues(
      countrySearch.value
    );
    fetchFromAPI.baseFetch().then(response => {
      if (response.hasOwnProperty('_embedded') === false) {
        getAnimationEventSearch(response, info, cardList, cards, eventName);
      }

      const eventList = response.page.totalElements;
      if (eventList === 0) {
        return;
      }

      removeListHidden(cardList);
      const result = response._embedded.events;
      if (countrySearch.value.trim() === '') {
        getCountriesFromEvents(result);
      }

      cardList.innerHTML = '';
      getStartPageMarkup(result);
      getTotalPages(pagesVerification(response));
      getCountriesFromEvents(result);
      removeDiv(info);
    });
  }
};
searchField.addEventListener('input', debounce(onSearchFildChange, 300));
