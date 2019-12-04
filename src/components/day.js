import { createElement } from '../utils';

const createDayTemplate = (date) => {
  const targetDate = new Date(date);
  const day = new Intl.DateTimeFormat(`en-US`, { day: `numeric` }).format(targetDate);
  const month = new Intl.DateTimeFormat(`en-US`, { month: `short` }).format(targetDate);
  const year = new Intl.DateTimeFormat(`en-US`, { year: `2-digit` }).format(targetDate);

  return (
    `<li class="trip-days__item  day">
      <div class="day__info">
        <span class="day__counter">${day}</span>
        <time class="day__date" datetime="2019-03-18">${month} ${year}</time>
      </div>

      <ul class="trip-events__list js-trip-events__list">
      </ul>
     </li>`
  );
};


export default class Day {
  constructor(date) {
    this._date = date;
    this._element = null;
  }

  getTemplate() {
    return createDayTemplate(this._date);
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
