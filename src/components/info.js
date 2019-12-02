import { formatDate } from '../utils';

const getCitiesMarkup = (cards) => {
  const cities = cards.map(({ city }) => city);
  if (cities.length > 3) {
    return `${cities[0]} &mdash; ... &mdash; ${cities[cities.length - 1]}`;
  }
  return cities.map((city, i) => i ? `&mdash; ${city}` : `${city}`).join(`\n`);
};

export const getInfoElement = (cards) => {
  const sortingCards = cards.sort((a, b) => a.startTime - b.startTime);
  const citiesMarkup = getCitiesMarkup(sortingCards);
  return (`
  <div class="trip-info__main">
    <h1 class="trip-info__title">${citiesMarkup}</h1>

    <p class="trip-info__dates">
    ${formatDate(sortingCards[0].startTime)}
    &nbsp;&mdash;&nbsp;
    ${formatDate(sortingCards[sortingCards.length - 1].endTime)}
    </p>
  </div>
  `);
};
