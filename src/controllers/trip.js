import SortComponent, { SortType } from '../components/sort';
import DayListComponent from '../components/day-list';
import DayComponent from '../components/day';
import PointController, { Mode as pointControllerMode, EMPTY_POINT } from './point.js';

import NoPointsMessageComponent from '../components/no-points-message';

import { getDate } from '../utils/common';
import { ArrayUtils } from '../utils/array';
import { HIDDEN_CLASS } from '../const';

import { renderComponent, RenderPosition } from '../utils/render';

const sortByDurationInDescendingOrder = (a, b) => (b.endTime - b.startTime) - (a.endTime - a.startTime);

const sortByPriceInDescendingOrder = (a, b) => b.price - a.price;

const renderPoints = (container, points, onDataChange, onViewChange, isDefaultSorting = true) => {
  const pointControllers = [];
  const dates = isDefaultSorting
    ? ArrayUtils.getUnique(points.map((point) => getDate(point.startTime)))
    : [true];

  dates.forEach((date, dateIndex) => {
    const day = isDefaultSorting
      ? new DayComponent(new Date(date), dateIndex + 1)
      : new DayComponent();

    points
      .filter((point) => {
        return isDefaultSorting
          ? getDate(point.startTime) === date
          : point;
      })
      .forEach((point) => {
        const pointController = new PointController(
            day.getElement().querySelector(`.js-trip-events__list`),
            onDataChange,
            onViewChange
        );
        pointController.render(point, pointControllerMode.DEFAULT);
        pointControllers.push(pointController);
      });

    renderComponent(container, day);
  });

  return pointControllers;
};

class TripController {
  constructor(container, pointModel) {
    this._container = container;
    this._pointModel = pointModel;

    this._showedPointControllers = [];
    this._isDefaultSorting = true;
    this._creatingPoint = null;

    this._onSortTypeChange = this._onSortTypeChange.bind(this);
    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);


    this._noPointsMessageComponent = new NoPointsMessageComponent();
    this._sortComponent = new SortComponent();
    this._dayListComponent = new DayListComponent();

    this._sortComponent.setSortTypeChangeHandler(this._onSortTypeChange);
    this._pointModel.setFilterChangeHandler(this._onFilterChange);
  }

  hide() {
    this._container.classList.add(HIDDEN_CLASS);
  }

  show() {
    this._container.classList.remove(HIDDEN_CLASS);
  }

  render() {

    const points = this._pointModel.getPoints();

    if (points.length === 0) {
      renderComponent(this._container, this._noPointsMessageComponent);
      return;
    }

    renderComponent(this._container, this._sortComponent);
    renderComponent(this._container, this._dayListComponent);

    const $dayList = this._dayListComponent.getElement();

    this._showedPointControllers = renderPoints($dayList, points, this._onDataChange, this._onViewChange);
  }

  _rerender() {
    this._removePoints();
    const $dayList = this._dayListComponent.getElement();
    $dayList.innerHTML = ``;
    this._showedPointControllers = renderPoints($dayList, this._pointModel.getPoints(), this._onDataChange, this._onViewChange, this._isDefaultSorting);
  }

  createPoint() {
    if (this._creatingPoint) {
      return;
    }

    this._onViewChange();

    const $dayList = this._dayListComponent.getElement();
    const day = new DayComponent();
    renderComponent($dayList, day, RenderPosition.AFTER_BEGIN);
    this._creatingPoint = new PointController(day.getElement().querySelector(`.js-trip-events__list`), this._onDataChange, this._onViewChange);
    this._creatingPoint.render(EMPTY_POINT, pointControllerMode.CREATING);
  }

  _deletePoint(point) {
    this._pointModel.removePoint(point.id);
    this._rerender();
  }

  _addPoint(pointController, nextPoint) {
    this._pointModel.addPoint(nextPoint);
    pointController.render(nextPoint);

    const destroyedPoint = this._showedPointControllers.pop();
    destroyedPoint.destroy();

    this._showedPointControllers = [pointController, ...this._showedPointControllers];
    this._rerender();
  }

  _editPoint(point, nextPoint) {
    const isSuccess = this._pointModel.updatePoint(point.id, nextPoint);

    if (isSuccess) {
      this._rerender();
    }
  }

  _removePoints() {
    this._showedPointControllers.forEach((pointController) => pointController.destroy());
    this._showedPointControllers = [];
  }

  _onDataChange(pointController, point, nextPoint) {
    this._creatingPoint = null;
    const isDeletingPoint = nextPoint === null;
    const isCreatingPoint = point === EMPTY_POINT;
    const isEditingPoint = point !== EMPTY_POINT && nextPoint !== null;

    if (isDeletingPoint) {
      this._deletePoint(point);
      return;
    }

    if (isCreatingPoint) {
      this._addPoint(pointController, nextPoint);
      return;
    }

    if (isEditingPoint) {
      this._editPoint(point, nextPoint);
      return;
    }
  }

  _onViewChange() {
    this._showedPointControllers.forEach((controller) => controller.setDefaultView());
  }

  _onSortTypeChange(sortType) {
    let sortedPoints = [];
    const points = this._pointModel.getPoints();

    const $dayList = this._dayListComponent.getElement();

    switch (sortType) {
      case SortType.TIME: {
        sortedPoints = ArrayUtils.sortPurely(points, sortByDurationInDescendingOrder);
        this._isDefaultSorting = false;
        break;
      }
      case SortType.PRICE: {
        sortedPoints = ArrayUtils.sortPurely(points, sortByPriceInDescendingOrder);
        this._isDefaultSorting = false;
        break;
      }
      case SortType.DEFAULT:
      default : {
        sortedPoints = points;
        this._isDefaultSorting = true;
        break;
      }
    }
    this._removePoints();
    $dayList.innerHTML = ``;

    this._showedPointControllers = renderPoints($dayList, sortedPoints, this._onDataChange, this._onViewChange, this._isDefaultSorting);
  }

  _onFilterChange() {
    this._rerender();
  }

}

export { TripController as default };
