import AbstractComponent from './abstract-component';

import { formatDate, getFirst, getLast } from '../utils';

const getCitiesTemplate = (cards) => {
  const cities = cards.map(({ city }) => city);
  if (cities.length > 3) {
    const sourceCity = getFirst(cities);
    const destinationCity = getLast(cities);
    return `${sourceCity} &mdash; ... &mdash; ${destinationCity}`;
  }
  return cities.map((city) => `${city}`).join(`&mdash`);
};

const getInfoElement = (cards) => {
  const sortingCards = cards.sort((a, b) => a.startTime - b.startTime);
  const citiesTemplate = getCitiesTemplate(sortingCards);
  return (`
  <div class="trip-info__main">
    <h1 class="trip-info__title">${citiesTemplate}</h1>

    <p class="trip-info__dates">
    ${formatDate(getFirst(sortingCards).startTime)}
    &nbsp;&mdash;&nbsp;
    ${formatDate(getLast(sortingCards).endTime)}
    </p>
  </div>
  `);
};

export default class Info extends AbstractComponent {
  constructor(cards) {
    super();
    this._cards = cards;
  }

  getTemplate() {
    return getInfoElement(this._cards);
  }
}

