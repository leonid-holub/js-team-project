export function saveBasketOnLocalStorage() {
  let allEvents = [];
  let basketLocalStorage;
  basketLocalStorage = localStorage.getItem('Events');
  if (basketLocalStorage === null) {
    allEvents.push(JSON.parse(localStorage.getItem('Event')));
    localStorage.setItem('Events', JSON.stringify(allEvents));
  } else {
    allEvents = JSON.parse(basketLocalStorage);
    allEvents.push(JSON.parse(localStorage.getItem('Event')));
    localStorage.setItem('Events', JSON.stringify(allEvents));
  }
}
