import AbstractComponent from './abstract-component';

import { formatDate, getFirst, getLast, sortPurely, sortByStartTimeInAscendingOrder } from '../utils/common';

const getCitiesTemplate = (events) => {
  const cities = events.map(({ city }) => city);
  if (cities.length > 3) {
    const sourceCity = getFirst(cities);
    const destinationCity = getLast(cities);
    return `${sourceCity} &mdash; ... &mdash; ${destinationCity}`;
  }
  return cities.map((city) => `${city}`).join(`&mdash`);
};

const getInfoElement = (points) => {
  if (points.length === 0) {
    return ``;
  }

  const sortedPoints = sortPurely(points, sortByStartTimeInAscendingOrder);
  const citiesTemplate = getCitiesTemplate(sortedPoints);
  return (`
  <div class="trip-info__main">
    <h1 class="trip-info__title">${citiesTemplate}</h1>

    <p class="trip-info__dates">
    ${formatDate(getFirst(sortedPoints).startTime)}
    &nbsp;&mdash;&nbsp;
    ${formatDate(getLast(sortedPoints).endTime)}
    </p>
  </div>
  `);
};

class Info extends AbstractComponent {
  constructor(points) {
    super();
    this._points = points;
  }

  getTemplate() {
    return getInfoElement(this._points);
  }
}

export { Info as default };
