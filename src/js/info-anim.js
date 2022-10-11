export function getAnimation(resp, elemDiv, elemList, elemBox, fromQuery, ev) {
    if(resp.hasOwnProperty('_embedded') === false) {
        elemDiv.classList.remove('info--hidden');
      elemList.classList.add('cards__list--hidden');
      elemDiv.classList.add('info');
      elemBox.prepend(elemDiv);
      elemDiv.textContent = `Ooops...we could not find any matches for '${fromQuery}'. Please, try again.`;
      
      ev.target.value = '';
      return;
  } 
}

export function removeListHidden(elemList) {
    elemList.classList.remove('cards__list--hidden');
}

export function removeDiv(elemDiv) {
    elemDiv.remove();
}