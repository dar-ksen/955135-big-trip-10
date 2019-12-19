import AbstractComponent from './abstract-component';

import { formatDate } from '../utils/common';

import { ArrayUtils } from '../utils/array';

const sortByStartTimeInAscendingOrder = (a, b) => a.startTime - b.startTime;

const getCitiesTemplate = (events) => {
  const cities = events.map(({ city }) => city);
  if (cities.length > 3) {
    const sourceCity = ArrayUtils.getFirst(cities);
    const destinationCity = ArrayUtils.getLast(cities);
    return `${sourceCity} &mdash; ... &mdash; ${destinationCity}`;
  }
  return cities.map((city) => `${city}`).join(`&mdash`);
};

const getInfoElement = (points) => {
  if (points.length === 0) {
    return ``;
  }

  const sortedPoints = ArrayUtils.sortPurely(points, sortByStartTimeInAscendingOrder);
  const citiesTemplate = getCitiesTemplate(sortedPoints);
  return (`
  <div class="trip-info__main">
    <h1 class="trip-info__title">${citiesTemplate}</h1>

    <p class="trip-info__dates">
    ${formatDate(ArrayUtils.getFirst(sortedPoints).startTime)}
    &nbsp;&mdash;&nbsp;
    ${formatDate(ArrayUtils.getLast(sortedPoints).endTime)}
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
