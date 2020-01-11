import AbstractComponent from './abstract-component';

const getStatisticsTemplate = () => {
  return (`
    <ul class="trip-days js-trip-days"></ul>
  `);
};

class Statistics extends AbstractComponent {
  getTemplate() {
    return getStatisticsTemplate();
  }
}

export { Statistics as default };
