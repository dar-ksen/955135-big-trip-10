import AbstractComponent from './abstract-component';

const getNoCardsMessageTemplate = () => {
  return `<p class="trip-events__msg">Click New Event to create your first point</p>`;
};

export default class NoCardsMessage extends AbstractComponent {
  getTemplate() {
    return getNoCardsMessageTemplate();
  }
}
