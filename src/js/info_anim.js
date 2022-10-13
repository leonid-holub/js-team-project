import getTotalPages from './get_total_pages';

export function getAnimation(resp, elemDiv, elemList, elemBox, fromQuery) {
  if (resp.hasOwnProperty('_embedded') === false) {
    const resetCountriess = document.querySelector('.header__cancel-circle');
    elemDiv.classList.remove('info--hidden');
    elemList.classList.add('cards__list--hidden');
    elemDiv.classList.add('info');
    elemBox.prepend(elemDiv);
    elemDiv.textContent = `Ooops...we could not find any matches for '${fromQuery}'. Please, try again.`;
    resetCountriess.classList.add('is-hidden');
    getTotalPages(1);
    return;
  }
}

export function getAnimationEventSearch(
  resp,
  elemDiv,
  elemList,
  elemBox,
  fromQuery
) {
  if (resp.hasOwnProperty('_embedded') === false) {
    const resetCountriess = document.querySelector('.header__cancel-circle');
    elemDiv.classList.remove('info--hidden');
    elemList.classList.add('cards__list--hidden');
    elemDiv.classList.add('info');
    elemBox.prepend(elemDiv);
    elemDiv.textContent = `Ooops...we could not find any matches for '${fromQuery}'. Please, try again.`;
    getTotalPages(1);
    return;
  }
}

export function removeListHidden(elemList) {
  elemList.classList.remove('cards__list--hidden');
}

export function removeDiv(elemDiv) {
  elemDiv.remove();
}
