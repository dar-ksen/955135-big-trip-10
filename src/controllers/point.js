import { renderComponent, replace } from '../utils/render';
import EventComponent from '../components/event';
import EventEditComponent from '../components/event-edit';

const Mode = {
  DEFAULT: `default`,
  EDIT: `edit`,
};

export default class PointController {
  constructor(container, onDataChange, onViewChange) {
    this._container = container;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;

    this._mode = Mode.DEFAULT;
    this._eventComponent = null;
    this._eventEditComponent = null;

    this._onEscKeyDown = this._onEscKeyDown.bind(this);
  }

  render(pointData) {
    const oldEventComponent = this._eventComponent;
    const oldEventEditComponent = this._eventEditComponent;

    this._eventComponent = new EventComponent(pointData);

    this._eventEditComponent = new EventEditComponent(pointData);

    this._eventComponent.setEditButtonClickHandler(() => {
      this._startEventEditing();
      document.addEventListener(`keydown`, this._onEscKeyDown);
    });

    this._eventEditComponent.setSubmitHandler(() => this._stopEventEditing());

    this._eventEditComponent.setInputFavoriteChangeHandler(() => {
      this._onDataChange(this, pointData, Object.assign({}, pointData, {
        isFavored: !pointData.isFavored,
      }));
    });

    if (oldEventEditComponent && oldEventComponent) {
      replace(this._eventComponent, oldEventComponent);
      replace(this._eventEditComponent, oldEventEditComponent);
    } else {
      renderComponent(this._container, this._eventComponent);
    }
  }

  setDefaultView() {
    if (this._mode !== Mode.DEFAULT) {
      this._stopEventEditing();
    }
  }

  _startEventEditing() {
    this._onViewChange();

    replace(this._eventEditComponent, this._eventComponent);
    this._mode = Mode.EDIT;
  }

  _stopEventEditing() {
    replace(this._eventComponent, this._eventEditComponent);
    this._mode = Mode.DEFAULT;
  }

  _onEscKeyDown(evt) {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      this._stopEventEditing();
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    }
  }
}
