import AbstractComponent from './abstract-component';
import { format } from 'date-fns';

const createDayTemplate = (date, day) => {

  return (
    `<li class="trip-days__item  day">
      <div class="day__info">
        <span class="day__counter">${day || ``}</span>
        <time class="day__date" datetime="${date || ``}">
        ${date && format(date, `LLL dd`) || ``}
        </time>
      </div>

      <ul class="trip-events__list js-trip-events__list">
      </ul>
     </li>`
  );
};


class Day extends AbstractComponent {
  constructor(date, day) {
    super();
    this._date = date;
    this._day = day;
  }

  getTemplate() {
    return createDayTemplate(this._date, this._day);
  }
}

export { Day as default };
