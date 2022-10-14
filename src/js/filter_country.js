import { FetchService } from './base_fetch';
import { getStartPageMarkup } from './start_page_render';
import getTotalPages from '../js/get_total_pages';
import { defaultCountryDataList } from './datalist_countries';
import { getAnimation, removeListHidden, removeDiv } from './info_anim';
import { suppCountries } from './all_supp_countries';
import { pagesVerification } from './pages_verification';
import debounce from 'lodash.debounce';
const fetchCountries = new FetchService();

const DELAY_MS = 500;

const refs = {
  form: document.querySelector('.header__form'),
  resetCountries: document.querySelector('.header__cancel-circle'),
  allCountries: document.querySelectorAll('#countries option'),
  countryListFromOption: document.querySelector('.header__form #countries'),

  countrySearch: document.querySelector('.header__country .header__input'),
  searchField: document.querySelector('.header__serch .header__input'),

  pagination: document.querySelector('.pagination'),
};
const cardList = document.querySelector('.cards__list');
const cards = document.querySelector('.cards');

const allOptions = refs.countryListFromOption.childNodes;
const info = document.createElement('div');

refs.countrySearch.addEventListener('change', onCountrySearchChange);

function onCountrySearchChange(e) {
  const query = e.target.value.trim();
  if (suppCountries.getKeyForValues(refs.countrySearch.value)) {
    let countryCode = suppCountries.getKeyForValues(refs.countrySearch.value);

    fetchCountries.config.params.countryCode = countryCode;
    fetchCountries.config.params.keyword = refs.searchField.value;

    fetchCountries.baseFetch().then(response => {
      refs.resetCountries.classList.remove('is-hidden');
      getAnimation(response, info, cardList, cards, query, e);
      if (response.hasOwnProperty('_embedded') === false) {
        e.target.value = '';
        return;
      }

      removeListHidden(cardList);
      const result = response._embedded.events;
      cardList.innerHTML = '';
      getStartPageMarkup(result);
      getTotalPages(pagesVerification(response));
      removeDiv(info);
    });
  } else {
    removeDiv(info);
    let countryCode = refs.countrySearch.value;
    fetchCountries.config.params.countryCode = countryCode;
    fetchCountries.config.params.keyword = refs.searchField.value;
    fetchCountries.baseFetch().then(response => {
      getAnimation(response, info, cardList, cards, query, e);
      if (response.hasOwnProperty('_embedded') === false) {
        e.target.value = '';
        return;
      }
    });
  }
}

export function getCountriesFromEvents(events) {
  refs.countryListFromOption.innerHTML = '';
  let receivedCountries = [];
  if (refs.searchField.value === '') {
    defaultCountryDataList();
    removeDiv(info);
    return;
  }

  events.map(event => {
    const countriesFromEvent = event._embedded.venues[0].country;
    receivedCountries.push(countriesFromEvent);
  });

  const result = receivedCountries.reduce((country, i) => {
    if (!country.find(it => it.countryCode == i.countryCode)) {
      country.push(i);
    }
    return country;
  }, []);

  result.forEach(elem => {
    refs.countryListFromOption.insertAdjacentHTML(
      'beforeend',
      `<option value="${elem.name}">${elem.countryCode}</option>`
    );
  });

  if (refs.countrySearch !== '') {
    return;
  }
}

refs.form.addEventListener('input', debounce(onFormChange, DELAY_MS));

function onFormChange(e) {
  let searchFromEvent = null;
  let searchFromCountry = null;
  let valueFromEvent = '';
  let valueFromCountry = '';

  if (e.target.name === 'event') {
    searchFromEvent = e.target;
    valueFromEvent = searchFromEvent.value;
  }

  if (e.target.name === 'country') {
    searchFromCountry = e.target;
    valueFromCountry = searchFromCountry.value;
  }

  if (valueFromEvent !== '') {
    removeDiv(info);
  }

  if (valueFromCountry !== '') {
    removeDiv(info);
  }
}
