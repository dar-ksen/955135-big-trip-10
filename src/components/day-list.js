import AbstractComponent from './abstract-component';

const getCardContainerTemplate = () => {
  return (`
    <ul class="trip-days js-trip-days"></ul>
  `);
};

export default class DayList extends AbstractComponent {
  getTemplate() {
    return getCardContainerTemplate();
  }
}
