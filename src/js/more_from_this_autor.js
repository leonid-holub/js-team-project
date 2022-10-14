import { FetchService } from './base_fetch';
import { closeModalBtn } from './modal';
import { getStartPageMarkup } from './start_page_render';
import { pagesVerification } from './pages_verification';
import getTotalPages from '../js/get_total_pages';
import { suppCountries } from './all_supp_countries';
import { getAnimation, removeListHidden, removeDiv } from './info_anim';
import { getCountriesFromEvents } from './filter_country';

const refs = {
  moreFromThisAutorBtn: document.querySelector('.modal__btn-more'),
  countrySearch: document.querySelector('.header__country .header__input'),
  cardList: document.querySelector('.cards__list'),
  resetCountries: document.querySelector('.header__cancel-circle'),
  inputValue: document.querySelector('[data-input-search]'),
  info: document.createElement('div'),
  cards: document.querySelector('.cards'),
};

const fetchFromAPI = new FetchService();

refs.moreFromThisAutorBtn.addEventListener(
  'click',
  onMoreFrormThisAuthorBtnClick
);

function onMoreFrormThisAuthorBtnClick(e) {
  refs.cardList.innerHTML = '';
  e.preventDefault();
  const authorName = document.querySelector('.author-name-js');
  fetchFromAPI.config.params.keyword = authorName.textContent;
  fetchFromAPI.config.params.countryCode = suppCountries.getKeyForValues(
    refs.countrySearch.value
  );
  refs.inputValue.value = authorName.textContent;
  fetchFromAPI.baseFetch().then(response => {
    getAnimation(
      response,
      refs.info,
      refs.cardList,
      refs.cards,
      authorName.textContent,
      e
    );

    const eventList = response.page.totalElements;

    if (eventList === 0) {
      return;
    }

    removeListHidden(refs.cardList);
    const result = response._embedded.events;
    getStartPageMarkup(result);
    getTotalPages(pagesVerification(response));
    getCountriesFromEvents(result);
    removeDiv(refs.info);
  });

  closeModalBtn();
}
