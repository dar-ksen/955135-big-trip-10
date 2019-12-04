import { createElement } from '../utils';

const sortCardTemplate = () => {
  return (`
  <li class="trip-days__item  day">
    <div class="day__info">
    </div>

    <ul class="trip-events__list js-trip-events__list">
    </ul>
  </li>`
  );
};

export default class SortCards {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return sortCardTemplate();
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
