import AbstractComponent from './abstract-component';

import { formatTime, getTwoDigitFormat } from '../utils/common';
import { offerList } from '../const';

const getDuration = (start, end) => {
  const duration = Math.floor((end - start) / (60 * 1000));
  let minutes = getTwoDigitFormat(duration % 60);
  let hours = getTwoDigitFormat(Math.floor(duration / 60) % 24);
  let days = getTwoDigitFormat(Math.floor(duration / (60 * 24)));
  return {
    minutes,
    hours,
    days
  };
};

const getDurationTemplate = (duration) => `
  ${duration.days !== `00` ? `${duration.days}D` : ``}
  ${duration.hours !== `00` ? `${duration.hours}H` : ``}
  ${duration.minutes !== `00` ? `${duration.minutes}M` : ``}`
;

const getAvailableOffersTemplate = (offers, availableOfferNames) => {
  return availableOfferNames.map((offerName)=> `<li class="event__offer">
    <span class="event__offer-title">${offers[offerName].title}</span>
     &plus;
    &euro;&nbsp;<span class="event__offer-price">${offers[offerName].price}</span>
   </li>`).join(`\n`);
};

const getPointTemplate = ({ type, city, startTime, endTime, price, offers }) => {
  const availableOfferNames = Object.entries(offers)
  .filter(([, isOfferAvailable]) => isOfferAvailable)
  .map(([offerName]) => offerName);
  const offerTemplate = getAvailableOffersTemplate(offerList, availableOfferNames);
  const duration = getDuration(startTime, endTime);
  const durationTemplate = getDurationTemplate(duration);

  return (`
  <li class="trip-events__item">
    <div class="event">
      <div class="event__type">
        <img class="event__type-icon" width="42" height="42" src="img/icons/${type.id}.png" alt="Event type icon">
      </div>
      <h3 class="event__title">${type.title} ${type.placeholder} ${city}</h3>

      <div class="event__schedule">
        <p class="event__time">
          <time class="event__start-time" datetime="${startTime.toISOString()}">${formatTime(startTime)}</time>
          &mdash;
          <time class="event__end-time" datetime="${endTime.toISOString()}">${formatTime(endTime)}</time>
        </p>
        <p class="event__duration">${durationTemplate}</p>
      </div>

      <p class="event__price">
        &euro;&nbsp;<span class="event__price-value">${price}</span>
      </p>

      <h4 class="visually-hidden">Offers:</h4>
      <ul class="event__selected-offers">
        ${offerTemplate}
      </ul>

      <button class="event__rollup-btn js-event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </div>
  </li>`);
};

class Point extends AbstractComponent {
  constructor(point) {
    super();

    this._point = point;
  }

  getTemplate() {
    return getPointTemplate(this._point);
  }

  setEditButtonClickHandler(handler) {
    this.getElement()
      .querySelector(`.js-event__rollup-btn`)
      .addEventListener(`click`, handler);
  }
}

export { Point as default };
