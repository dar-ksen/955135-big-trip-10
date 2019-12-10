import AbstractComponent from './abstract-component';

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

export default class SortCards extends AbstractComponent {
  getTemplate() {
    return sortCardTemplate();
  }
}
