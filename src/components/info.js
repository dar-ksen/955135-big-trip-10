import { formatDate, getFirst, getLast, createElement } from '../utils';

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

export default class Info {
  constructor(cards) {
    this._cards = cards;
    this._element = null;
  }

  getTemplate() {
    return getInfoElement(this._cards);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}

