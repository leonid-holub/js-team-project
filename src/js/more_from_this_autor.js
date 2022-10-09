import { FetchService } from './base_fetch';
import { closeModalBtn } from './modal';
import { getStartPageMarkup } from './start_page-render';

const refs = {
  moreFromThisAutorBtn: document.querySelector('.modal__btn-more'),
  authorName: document.querySelector('.author-name-js'),
  cardList: document.querySelector('.cards__list'),
};

const fetchFromAPI = new FetchService();

refs.moreFromThisAutorBtn.addEventListener(
  'click',
  onMoreFrormThisAuthorBtnClick
);

function onMoreFrormThisAuthorBtnClick() {
  closeModalBtn();
  refs.cardList.innerHTML = '';
  const authorName = '50';
  fetchFromAPI.config.params.keyword = refs.authorName.textContent;
  fetchFromAPI.baseFetch().then(response => {
    getStartPageMarkup(response._embedded.events);
  });
}
