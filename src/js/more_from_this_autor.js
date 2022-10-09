import { FetchService } from './base_fetch';
import { closeModalBtn } from './modal';
import { getStartPageMarkup } from './start_page-render';

const refs = {
  moreFromThisAutorBtn: document.querySelector('.modal__btn-more'),

  cardList: document.querySelector('.cards__list'),
};

const fetchFromAPI = new FetchService();

refs.moreFromThisAutorBtn.addEventListener(
  'click',
  onMoreFrormThisAuthorBtnClick
);

function onMoreFrormThisAuthorBtnClick() {
  refs.cardList.innerHTML = '';

  const authorName = document.querySelector('.author-name-js');
  fetchFromAPI.config.params.keyword = authorName.textContent;

  fetchFromAPI.baseFetch().then(response => {
    getStartPageMarkup(response._embedded.events);
  });

  closeModalBtn();
}
