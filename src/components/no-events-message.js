import AbstractComponent from './abstract-component';

const getNoEventsMessageTemplate = () => {
  return `<p class="trip-events__msg">Click New Event to create your first point</p>`;
};

export default class NoEventsMessage extends AbstractComponent {
  getTemplate() {
    return getNoEventsMessageTemplate();
  }
}
