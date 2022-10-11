import { Notify } from 'notiflix/build/notiflix-notify-aio';

import { Report } from 'notiflix/build/notiflix-report-aio';

import { FetchService } from './base_fetch';
import debounce from 'lodash.debounce';

import { getStartPageMarkup } from './start_page-render';

// '196, 196, 196, 0.03'
// '#ffffff'
Notify.init({
  width: '450px',
  // position: 'center-center',
  fontFamily: 'Montserrat',
  fontSize: '18px',
  failure: {
    background: '#ffffff',
    textColor: '#0e0e0e',
    notiflixIconColor: '#DC56C5',
  },
});

const fetchCountries = new FetchService();

const refs = {
  form: document.querySelector('.header__form'),

  allCountries: document.querySelectorAll('#countries option'),
  countryListFromOption: document.querySelector('.header__form #countries'),

  countrySearch: document.querySelector('.header__country .header__input'),
  searchField: document.querySelector('.header__serch .header__input'),

  cardList: document.querySelector('.cards__list'),

  pagination: document.querySelector('.pagination'),
};
const allOptions = refs.countryListFromOption.childNodes;

refs.countrySearch.addEventListener('change', onCountrySearchChange);

function onCountrySearchChange(e) {
  const query = e.target.value.trim();
  let countryCode = null;

  allOptions.forEach(it => {
    if (query === it.value) {
      countryCode = it.textContent;
    }
  });

  fetchCountries.config.params.countryCode = countryCode;
  fetchCountries.config.params.keyword = refs.searchField.value;
  fetchCountries
    .baseFetch()
    .then(response => {
      if (response.hasOwnProperty('_embedded') === false) {
        refs.cardList.innerHTML = '';
        e.target.value = '';
        refs.pagination.classList.add('is-hidden');
        throw new Error(
          `Ooops...there are no events in ${query}. Please, choose another country.`
        );
      }

      const result = response._embedded.events;

      refs.cardList.innerHTML = '';

      getStartPageMarkup(result);

      refs.pagination.classList.remove('is-hidden');
    })
    .catch(e => {
      Notify.failure(e.message);
    });
}

export function getCountriesFromEvents(events) {
  let receivedCountries = [];

  events.map((event, i) => {
    const countriesFromEvent = event._embedded.venues[0].country;
    receivedCountries.push(countriesFromEvent);
  });

  const result = receivedCountries.reduce((country, i) => {
    if (!country.find(it => it.countryCode == i.countryCode)) {
      country.push(i);
    }
    return country;
  }, []);

  refs.countryListFromOption.innerHTML = '';

  result.forEach((elem, index) => {
    refs.countryListFromOption.insertAdjacentHTML(
      'beforeend',
      `<option value="${elem.name}">${elem.countryCode}</option>`
    );
  });
}
