import AbstractComponent from './abstract-component';

const SortType = {
  TIME: `time`,
  PRICE: `price`,
  DEFAULT: `default`,
};

const getSortTemplate = () => {
  return (`
    <form class="trip-events__trip-sort  trip-sort" action="#" method="get">
      <span class="trip-sort__item  trip-sort__item--day"></span>

      <div class="trip-sort__item  trip-sort__item--event">
        <input
          id="sort-event"
          data-sort-type="${SortType.DEFAULT}"
          class="trip-sort__input visually-hidden"
          type="radio" name="trip-sort"
          value="sort-event"
          checked
        >
        <label class="trip-sort__btn" for="sort-event">Event</label>
      </div>

      <div class="trip-sort__item  trip-sort__item--time">
        <input
          id="sort-time"
          data-sort-type="${SortType.TIME}"
          class="trip-sort__input  visually-hidden"
          type="radio"
          name="trip-sort"
          value="sort-time"
        >
        <label class="trip-sort__btn  trip-sort__btn--active  trip-sort__btn--by-increase" for="sort-time">
          Time
        </label>
      </div>

      <div class="trip-sort__item  trip-sort__item--price">
        <input
          id="sort-price"
          data-sort-type="${SortType.PRICE}"
          class="trip-sort__input visually-hidden"
          type="radio" name="trip-sort"
          value="sort-price"
        >
        <label class="trip-sort__btn" for="sort-price">
          Price
        </label>
      </div>

      <span class="trip-sort__item  trip-sort__item--offers">Offers</span>
    </form>
  `);
};

export default class Sort extends AbstractComponent {
  constructor() {
    super();

    this._currentSortType = SortType.DEFAULT;
  }

  getTemplate() {
    return getSortTemplate();
  }
}

