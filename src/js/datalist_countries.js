import { suppCountries } from './all_supp_countries';

const queryCountry = document.querySelector('.header__form #countries');
export const defaultCountryDataList = function () {
  const countriesList = suppCountries.getKeysAndValues();
  countriesList.forEach((elem, index) => {
    queryCountry.insertAdjacentHTML(
      'beforeend',
      `<option value="${elem[1]}">${elem[0]}</option>`
    );
  });
};
defaultCountryDataList();
