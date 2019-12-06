import { createElement } from '../utils';

const createDayTemplate = (date) => {
  const targetDate = new Date(date);
  const day = targetDate.toLocaleString(`en-US`, { day: `numeric` });
  const month = targetDate.toLocaleString(`en-US`, { month: `short` });
  const year = targetDate.toLocaleString(`en-US`, { year: `2-digit` });

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
