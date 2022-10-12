import { FetchService } from './base_fetch';
import { getStartPageMarkup } from './start_page-render';
import { defaultCountryDataList } from './datalist_countries';
import { getAnimation, removeListHidden, removeDiv } from './info-anim';
import { suppCountries } from './all_supp_countries';
const fetchCountries = new FetchService();

const refs = {
  form: document.querySelector('.header__form'),

  allCountries: document.querySelectorAll('#countries option'),
  countryListFromOption: document.querySelector('.header__form #countries'),

  countrySearch: document.querySelector('.header__country .header__input'),
  searchField: document.querySelector('.header__serch .header__input'),

  pagination: document.querySelector('.pagination'),
};
const cardList = document.querySelector('.cards__list');
const cards = document.querySelector('.cards');
//   cardList: document.querySelector('.cards__list'),

//   pagination: document.querySelector('.pagination'),
// ;

const allOptions = refs.countryListFromOption.childNodes;
const info = document.createElement('div');

refs.countrySearch.addEventListener('change', onCountrySearchChange);

function onCountrySearchChange(e) {
  const query = e.target.value.trim();
  let countryCode = suppCountries.getKeyForValues(
    refs.countrySearch.value);

  fetchCountries.config.params.countryCode = countryCode;
  fetchCountries.config.params.keyword = refs.searchField.value;

  fetchCountries.baseFetch().then(response => {
    getAnimation(response, info, cardList, cards, query, e);

    if (response.hasOwnProperty('_embedded') === false) {
      e.target.value = '';
      return;
    }

    removeListHidden(cardList);
    const result = response._embedded.events;
    getStartPageMarkup(result);
    removeDiv(info);
  });
}

export function getCountriesFromEvents(events) {
  refs.countryListFromOption.innerHTML = '';
  let receivedCountries = [];
  if (refs.searchField.value === '') {
    defaultCountryDataList();
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
