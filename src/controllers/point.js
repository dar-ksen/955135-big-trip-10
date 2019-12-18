import { renderComponent, replace } from '../utils/render';
import PointComponent from '../components/point';
import PointEditComponent from '../components/point-edit';

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

    this._pointEditComponent = new PointEditComponent(pointData);

    this._pointComponent.setEditButtonClickHandler(() => {
      this._startEventEditing();
      document.addEventListener(`keydown`, this._onEscKeyDown);
    });

    this._pointEditComponent.setSubmitHandler(() => this._stopEventEditing());

    this._pointEditComponent.setInputFavoriteChangeHandler(() => {
      this._onDataChange(this, pointData, { ...pointData, isFavored: !pointData.isFavored });
    });

    if (oldPointEditComponent && oldPointComponent) {
      replace(this._pointComponent, oldPointComponent);
      replace(this._pointEditComponent, oldPointEditComponent);
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

    replace(this._pointEditComponent, this._pointComponent);
    this._mode = Mode.EDIT;
  }

  _stopEventEditing() {
    replace(this._pointComponent, this._pointEditComponent);
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
