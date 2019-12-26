import AbstractComponent from './abstract-component';
import { format } from 'date-fns';

const DIFFERENCE_NUMBER = 1;

const createDayTemplate = (date, index) => {
  const targetDate = new Date(date);

  return (
    `<li class="trip-days__item  day">
      <div class="day__info">
        <span class="day__counter">${index + DIFFERENCE_NUMBER}</span>
        <time class="day__date" datetime="${date}">${format(targetDate, `LLL dd`)}</time>
      </div>

      <ul class="trip-events__list js-trip-events__list">
      </ul>
     </li>`
  );
};


class Day extends AbstractComponent {
  constructor(date, index) {
    super();
    this._date = date;
    this._number = index;
  }

  getTemplate() {
    return createDayTemplate(this._date, this._number);
  }
}

export { Day as default };
