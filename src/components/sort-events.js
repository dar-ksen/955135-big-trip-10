import AbstractComponent from './abstract-component';

const sortEventsTemplate = () => {
  return (`
  <li class="trip-days__item  day">
    <div class="day__info">
    </div>

    <ul class="trip-events__list js-trip-events__list">
    </ul>
  </li>`
  );
};

export default class SortEvents extends AbstractComponent {
  getTemplate() {
    return sortEventsTemplate();
  }
}
