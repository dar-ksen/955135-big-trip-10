import AbstractComponent from './abstract-component';

const sortPointsTemplate = () => {
  return (`
  <li class="trip-days__item  day">
    <div class="day__info">
    </div>

    <ul class="trip-events__list js-trip-events__list">
    </ul>
  </li>`
  );
};

class SortPoints extends AbstractComponent {
  getTemplate() {
    return sortPointsTemplate();
  }
}

export { SortPoints as default };
