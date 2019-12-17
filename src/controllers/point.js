import { renderComponent, replace } from '../utils/render';
import EventComponent from '../components/event';
import EventEditComponent from '../components/event-edit';

export default class PointController {
  constructor(container) {
    this._container = container;
  }

  render(pointData) {
    const onEscKeyDown = (evt) => {
      const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

      if (isEscKey) {
        startEventEditing();
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };

    const startEventEditing = () => replace(eventComponent, eventEditComponent);

    const stopEventEditing = () => replace(eventEditComponent, eventComponent);

    const eventComponent = new EventComponent(pointData);

    eventComponent.setEditButtonClickHandler(() => {
      stopEventEditing();
      document.addEventListener(`keydown`, onEscKeyDown);
    });

    const eventEditComponent = new EventEditComponent(pointData);

    eventEditComponent.setSubmitHandler(startEventEditing);

    renderComponent(this._container, eventComponent);
  }
}
