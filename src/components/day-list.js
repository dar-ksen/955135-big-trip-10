import AbstractComponent from './abstract-component';

const getDayContainerTemplate = () => {
  return (`
    <ul class="trip-days js-trip-days"></ul>
  `);
};

class DayList extends AbstractComponent {
  getTemplate() {
    return getDayContainerTemplate();
  }
}

export { DayList as default };
