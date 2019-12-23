import { renderComponent, replaceComponent } from '../utils/render';
import PointComponent from '../components/point';
import PointEditFormComponent from '../components/point-edit-form';

const Mode = {
  DEFAULT: `default`,
  EDIT: `edit`,
};

class PointController {
  constructor(container, onDataChange, onViewChange) {
    this._container = container;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;

    this._mode = Mode.DEFAULT;
    this._pointComponent = null;
    this._pointEditComponent = null;

    this._onEscKeyDown = this._onEscKeyDown.bind(this);
  }

  render(pointData) {
    const oldPointComponent = this._pointComponent;
    const oldPointEditComponent = this._pointEditComponent;

    this._pointComponent = new PointComponent(pointData);

    this._pointEditFormComponent = new PointEditFormComponent(pointData);

    this._pointComponent.setEditButtonClickHandler(() => {
      this._startEventEditing();
      document.addEventListener(`keydown`, this._onEscKeyDown);
    });

    this._pointEditFormComponent.setSubmitHandler(() => this._stopEventEditing());

    this._pointEditFormComponent.setInputFavoriteChangeHandler(() => {
      this._onDataChange(this, pointData, { ...pointData, isFavored: !pointData.isFavored });
    });

    if (oldPointEditComponent && oldPointComponent) {
      replaceComponent(this._pointComponent, oldPointComponent);
      replaceComponent(this._pointEditFormComponent, oldPointEditComponent);
    } else {
      renderComponent(this._container, this._pointComponent);
    }
  }

  setDefaultView() {
    if (this._mode !== Mode.DEFAULT) {
      this._stopEventEditing();
    }
  }

  _startEventEditing() {
    this._onViewChange();

    replaceComponent(this._pointEditFormComponent, this._pointComponent);
    this._mode = Mode.EDIT;
  }

  _stopEventEditing() {
    replaceComponent(this._pointComponent, this._pointEditFormComponent);
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

export { PointController as default };
