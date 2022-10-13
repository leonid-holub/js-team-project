export const pagesVerification = function (response) {
  let result;
  if (response.page.size * response.page.totalPages < 1000) {
    result = response.page.totalPages;
  } else {
    if (Math.floor(1000 / response.page.size) === 1000 / response.page.size) {
      result = 1000 / response.page.size;
    } else if (
      Math.floor(1000 / response.page.size) <
      1000 / response.page.size
    ) {
      result = Math.ceil(1000 / response.page.size);
    }
  }
  return result;
};
