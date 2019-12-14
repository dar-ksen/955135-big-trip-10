import AbstractComponent from './abstract-component';

import { formatDate, getFirst, getLast } from '../utils/common';

const getCitiesTemplate = (events) => {
  const cities = events.map(({ city }) => city);
  if (cities.length > 3) {
    const sourceCity = getFirst(cities);
    const destinationCity = getLast(cities);
    return `${sourceCity} &mdash; ... &mdash; ${destinationCity}`;
  }
  return cities.map((city) => `${city}`).join(`&mdash`);
};

const getInfoElement = (events) => {
  if (events.length === 0) {
    return ``;
  }

  const sortingEvents = events.sort((a, b) => a.startTime - b.startTime);
  const citiesTemplate = getCitiesTemplate(sortingEvents);
  return (`
  <div class="trip-info__main">
    <h1 class="trip-info__title">${citiesTemplate}</h1>

    <p class="trip-info__dates">
    ${formatDate(getFirst(sortingEvents).startTime)}
    &nbsp;&mdash;&nbsp;
    ${formatDate(getLast(sortingEvents).endTime)}
    </p>
  </div>
  `);
};

export default class Info extends AbstractComponent {
  constructor(events) {
    super();
    this._events = events;
  }

  getTemplate() {
    return getInfoElement(this._events);
  }
}

