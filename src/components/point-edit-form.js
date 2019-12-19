import AbstractSmartComponent from './abstract-smart-component';

import { Cities, Offers, TypesOfTransfer, TypesOfActivity, Types } from '../const';


const getTime = (time) => {
  const formatterOptionsDate = {
    year: `2-digit`,
    month: `2-digit`,
    day: `numeric`,
    hour12: false,
    hour: `2-digit`,
    minute: `2-digit`,
  };

  const date = new Intl.DateTimeFormat(`en-US`, formatterOptionsDate).format(time);
  return `${date.replace(`,`, ``)}`;
};

const getTypeListTemplate = (types, activeType) => types.map((type) => {
  const checkedType = activeType.id === type.id ? `checked` : ``;
  return `<div class="event__type-item">
            <input id="event-type-${type.id}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type.id}" ${checkedType}>
            <label class="event__type-label  event__type-label--${type.id}" for="event-type-${type.id}-1">${type.title}</label>
          </div>`;
}).join(`\n`);

const getCitiesTemplate = (cities) => cities.map((city) => `<option value="${city}"></option>`).join(`\n`);

const getPicturesTemplate = (pictures) => {
  return pictures.map((picture) => `<img class="event__photo" src="${picture}" alt="Event photo"></img>`).join(`\n`);
};

const getOfferTemplate = (offers) => {
  const isChecked = (offer) => {
    return offers[offer] ? `checked` : ``;
  };
  return Object.keys(offers).map((offer)=> `
      <div class="event__offer-selector">
        <input class="event__offer-checkbox  visually-hidden" id="event-offer-${offer}-1" type="checkbox" name="event-offer-${offer}" ${isChecked(offer)}>
        <label class="event__offer-label" for="event-offer-${offer}-1">
        <span class="event__offer-title">${Offers[offer].title}</span>
        &plus;
        &euro;&nbsp;<span class="event__offer-price">${Offers[offer].price}</span>
        </label>
      </div>
  `).join(`\n`);
};

const editPointTemplate = (pointData, options = {}) => {
  const { city, pictures, description, startTime, endTime, price, offers, isFavored } = pointData;
  const { type } = options;

  const typeOfTransferListTemplate = getTypeListTemplate(TypesOfTransfer, type);
  const typeOfActivityListTemplate = getTypeListTemplate(TypesOfActivity, type);

  const picturesTemplate = getPicturesTemplate(pictures);
  const offerTemplate = getOfferTemplate(offers);
  const citiesTemplate = getCitiesTemplate(Cities);

  const favoredPoint = isFavored ? `checked` : ``;
  return (`
  <li class="trip-events__item">
    <form class="event  event--edit js-event--edit" action="#" method="post">
      <header class="event__header">
        <div class="event__type-wrapper">
          <label class="event__type  event__type-btn" for="event-type-toggle-1">
            <span class="visually-hidden">Choose event type</span>
            <img class="event__type-icon" width="17" height="17" src="img/icons/${type.id}.png" alt="Event type icon">
          </label>
          <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

          <div class="event__type-list js-event__type-list">
            <fieldset class="event__type-group">
              <legend class="visually-hidden">Transfer</legend>
              ${typeOfTransferListTemplate}
            </fieldset>

            <fieldset class="event__type-group">
              <legend class="visually-hidden">Activity</legend>
              ${typeOfActivityListTemplate}
            </fieldset>
          </div>
        </div>

        <div class="event__field-group  event__field-group--destination">
          <label class="event__label  event__type-output" for="event-destination-1">
            ${type.title} ${type.placeholder}
          </label>
          <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${city}" list="destination-list-1">
          <datalist id="destination-list-1">
            ${citiesTemplate}
          </datalist>
        </div>

        <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time-1">
            From
          </label>
          <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${getTime(startTime)}">
          &mdash;
          <label class="visually-hidden" for="event-end-time-1">
            To
          </label>
          <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${getTime(endTime)}">
        </div>

        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-1">
            <span class="visually-hidden">Price</span>
            &euro;
          </label>
          <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${price}">
        </div>

        <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
        <button class="event__reset-btn" type="reset">Delete</button>

        <input id="event-favorite-1" class="event__favorite-checkbox js-event__favorite-checkbox  visually-hidden" type="checkbox" name="event-favorite" ${favoredPoint}>
        <label class="event__favorite-btn" for="event-favorite-1">
          <span class="visually-hidden">Add to favorite</span>
          <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
            <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
          </svg>
        </label>

        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </header>

      <section class="event__details">

        <section class="event__section  event__section--offers">
          <h3 class="event__section-title  event__section-title--offers">Offers</h3>

          <div class="event__available-offers">
            ${offerTemplate}
          </div>
        </section>

        <section class="event__section  event__section--destination">
          <h3 class="event__section-title  event__section-title--destination">Destination</h3>
          <p class="event__destination-description">${description}</p>

          <div class="event__photos-container">
            <div class="event__photos-tape">
              ${picturesTemplate}
            </div>
          </div>
        </section>
      </section>
    </form>
  </li>
  `);
};

class PointEditForm extends AbstractSmartComponent {
  constructor(pointData) {
    super();

    this._pointData = pointData;
    this._type = { ...pointData.type };

    this._subscribeOnEvents();
  }

  getTemplate() {
    const options = {
      type: this._type,
    };

    return editPointTemplate(this._pointData, options);
  }

  setSubmitHandler(handler) {
    this.getElement()
      .querySelector(`.js-event--edit`)
      .addEventListener(`submit`, handler);
  }

  setInputFavoriteChangeHandler(handler) {
    this.getElement()
      .querySelector(`.js-event__favorite-checkbox`)
        .addEventListener(`change`, handler);
  }

  recoveryListeners() {
    this._subscribeOnEvents();
  }

  _subscribeOnEvents() {
    const $type = this.getElement().querySelector(`.js-event__type-list`);

    $type.addEventListener(`change`, () => {
      const value = $type
        .querySelector(`input:checked`)
        .value;
      this._type = Types.find(({ id }) => id === value);
      this.rerender();
    });
  }

}

export { PointEditForm as default };
