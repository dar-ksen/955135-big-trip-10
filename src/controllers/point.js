import { renderComponent, replaceComponent, removeComponent, RenderPosition } from '../utils/render';
import PointComponent from '../components/point';
import PointEditFormComponent from '../components/point-edit-form';

const Mode = {
  CREATING: `creating`,
  DEFAULT: `default`,
  EDIT: `edit`,
};

const EMPTY_POINT = {
  type: {
    id: `taxi`,
    title: `Taxi`,
    placeholder: `to`
  },
  city: ``,
  pictures: [],
  description: ``,
  startTime: new Date(),
  endTime: new Date(),
  price: 0,
  offers: {
    luggage: false,
    comfort: false,
    meal: false,
    seats: false,
    train: false,
  },
  isFavored: false,
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

  render(point, mode) {
    const oldPointComponent = this._pointComponent;
    const oldPointEditComponent = this._pointEditComponent;
    this._mode = mode;

    this._pointComponent = new PointComponent(point);

    this._pointEditFormComponent = new PointEditFormComponent(point);

    this._pointComponent.setEditButtonClickHandler(() => {
      this._startPointEditing();
      document.addEventListener(`keydown`, this._onEscKeyDown);
    });

    this._pointEditFormComponent.setSubmitHandler((evt) => {
      evt.preventDefault();
      const data = this._pointEditFormComponent.getData();
      this._onDataChange(this, point, { ...point, ...data });
      this._stopPointEditing();
    });

    this._pointEditFormComponent.setInputFavoriteChangeHandler(() => {
      this._onDataChange(this, point, { ...point, isFavored: !point.isFavored });
    });

    this._pointEditFormComponent.setDeleteButtonClickHandler(() => {
      this._onDataChange(this, point, null);
    });

    switch (mode) {
      case Mode.DEFAULT: {
        if (oldPointEditComponent && oldPointComponent) {
          replaceComponent(this._pointComponent, oldPointComponent);
          replaceComponent(this._pointEditComponent, oldPointEditComponent);
          this._stopPointEditing();
        } else {
          renderComponent(this._container, this._pointComponent);
        }
        break;
      }
      case Mode.CREATING: {
        if (oldPointEditComponent && oldPointComponent) {
          removeComponent(oldPointComponent);
          removeComponent(oldPointEditComponent);
        }
        document.addEventListener(`keydown`, this._onEscKeyDown);
        renderComponent(this._container, this._pointEditFormComponent, RenderPosition.AFTER_BEGIN);
        break;
      }
    }

  }

  setDefaultView() {
    if (this._mode !== Mode.DEFAULT) {
      this._stopPointEditing();
    }
  }

  destroy() {
    removeComponent(this._pointEditFormComponent);
    removeComponent(this._pointComponent);
    document.removeEventListener(`keydown`, this._onEscKeyDown);
  }

  _startPointEditing() {
    this._onViewChange();

    replaceComponent(this._pointEditFormComponent, this._pointComponent);
    this._mode = Mode.EDIT;
  }

  _stopPointEditing() {
    replaceComponent(this._pointComponent, this._pointEditFormComponent);
    this._mode = Mode.DEFAULT;
  }

  _onEscKeyDown(evt) {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      if (this._mode === Mode.CREATING) {
        this._onDataChange(this, EMPTY_POINT, null);
      }
      this._stopPointEditing();
    }
  }
}

export {
  PointController as default,
  Mode,
  EMPTY_POINT,
};
