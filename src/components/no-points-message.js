import AbstractComponent from './abstract-component';

const getNoPointsMessageTemplate = () => {
  return `<p class="trip-events__msg">Click New Event to create your first point</p>`;
};

class NoPointsMessage extends AbstractComponent {
  getTemplate() {
    return getNoPointsMessageTemplate();
  }
}

export { NoPointsMessage as default };
