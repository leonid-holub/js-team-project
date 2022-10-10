import {FetchService} from './base_fetch';
import debounce from 'lodash.debounce';

import { getStartPageMarkup } from './start_page-render';

const fetchCountries = new FetchService();

const refs = {
    form: document.querySelector('.header__form'),

    allCountries: document.querySelectorAll('#countries option'),
    countryListFromOption: document.querySelector('.header__form #countries'),

    countrySearch: document.querySelector('.header__country .header__input'),
    searchField: document.querySelector('.header__serch .header__input'),

    cardList: document.querySelector('.cards__list'),
}
const allOptions = refs.countryListFromOption.childNodes;

refs.countrySearch.addEventListener('change', onCountrySearchChange);

function onCountrySearchChange(e) {
    const query = e.target.value.trim();
    let countryCode = null;

    allOptions.forEach(it => {
        if(query === it.value) {
            countryCode = it.textContent;
        }
    })

    fetchCountries.config.params.countryCode = countryCode;
    fetchCountries.config.params.keyword = refs.searchField.value;
    fetchCountries.baseFetch().then(response => {
        const result = response._embedded.events;

        refs.cardList.innerHTML = '';
    
        getStartPageMarkup(result);
          });
}

export function getCountriesFromEvents(events) {
    let receivedCountries = [];

    events.map((event, i) => {
        const countriesFromEvent = event._embedded.venues[0].country;
        receivedCountries.push(countriesFromEvent);
    })

    const result = receivedCountries.reduce((country, i) => {
        if (!country.find(it => it.countryCode == i.countryCode)) {
          country.push(i);
        }
        return country;
      }, []);

    refs.countryListFromOption.innerHTML = ''

      result.forEach((elem, index) => {
        refs.countryListFromOption.insertAdjacentHTML(
          'beforeend',
          `<option value="${elem.name}">${elem.countryCode}</option>`
        );
      });
}





