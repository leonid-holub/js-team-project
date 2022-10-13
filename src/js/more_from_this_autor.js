import { FetchService } from './base_fetch';
import { closeModalBtn } from './modal';
import { getStartPageMarkup } from './start_page_render';
import { pagesVerification } from './pages_verification';
import getTotalPages from '../js/get_total_pages';

const refs = {
  moreFromThisAutorBtn: document.querySelector('.modal__btn-more'),

  cardList: document.querySelector('.cards__list'),

  inputValue: document.querySelector('[data-input-search]'),
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
  refs.inputValue.value = authorName.textContent;
  fetchFromAPI.baseFetch().then(response => {
    getStartPageMarkup(response._embedded.events);
    getTotalPages(pagesVerification(response));
  });

  closeModalBtn();
}
