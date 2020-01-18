import SortComponent, { SortType } from '../components/sort';
import DayListComponent from '../components/day-list';
import DayComponent from '../components/day';
import PointController, { Mode as pointControllerMode, EMPTY_POINT } from './point.js';
import InfoComponent from '../components/info';

import NoPointsMessageComponent from '../components/no-points-message';

import { getDate } from '../utils/common';
import { ArrayUtils } from '../utils/array';
import { HIDDEN_CLASS } from '../const';

import { renderComponent, RenderPosition } from '../utils/render';

const sortByDurationInDescendingOrder = (a, b) => (b.endTime - b.startTime) - (a.endTime - a.startTime);

const sortByPriceInDescendingOrder = (a, b) => b.price - a.price;

const renderPoints = (container, points, destinationsModel, offersModel, onDataChange, onViewChange, isDefaultSorting = true) => {
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
            destinationsModel,
            offersModel,
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
  constructor(container, headerContainer, pointsModel, destinationsModel, offersModel, api) {
    this._container = container;
    this._headerContainer = headerContainer;
    this._pointsModel = pointsModel;
    this._destinationsModel = destinationsModel;
    this._offersModel = offersModel;
    this._api = api;

    this._showedPointControllers = [];
    this._isDefaultSorting = true;
    this._creatingPoint = null;

    this._onSortTypeChange = this._onSortTypeChange.bind(this);
    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);


    this._noPointsMessageComponent = new NoPointsMessageComponent();
    this._sortComponent = new SortComponent();
    this._infoComponent = new InfoComponent(this._pointsModel);
    this._costContainer = headerContainer.querySelector(`.js-trip-info__cost-value`);
    this._dayListComponent = new DayListComponent();


    this._sortComponent.setSortTypeChangeHandler(this._onSortTypeChange);
    this._pointsModel.setFilterChangeHandler(this._onFilterChange);
  }

  hide() {
    this._container.classList.add(HIDDEN_CLASS);
  }

  show() {
    this._container.classList.remove(HIDDEN_CLASS);
  }

  render() {

    const points = this._pointsModel.getPoints();

    if (points.length === 0) {
      renderComponent(this._container, this._noPointsMessageComponent);
      return;
    }

    renderComponent(this._container, this._sortComponent);
    renderComponent(this._container, this._dayListComponent);

    renderComponent(this._headerContainer, this._infoComponent, RenderPosition.AFTER_BEGIN);
    this._costContainer.textContent = this._pointsModel.getTotalCost();

    const $dayList = this._dayListComponent.getElement();

    this._showedPointControllers = renderPoints($dayList, points, this._destinationsModel, this._offersModel, this._onDataChange, this._onViewChange);
  }

  _rerender() {
    this._removePoints();
    const $dayList = this._dayListComponent.getElement();
    $dayList.innerHTML = ``;
    this._showedPointControllers = renderPoints($dayList, this._pointsModel.getPoints(), this._destinationsModel, this._offersModel, this._onDataChange, this._onViewChange, this._isDefaultSorting);
  }

  createPoint() {
    if (this._creatingPoint) {
      return;
    }

    this._onViewChange();

    const $dayList = this._dayListComponent.getElement();
    const day = new DayComponent();
    renderComponent($dayList, day, RenderPosition.AFTER_BEGIN);
    this._creatingPoint = new PointController(day.getElement().querySelector(`.js-trip-events__list`), this._destinationsModel, this._offersModel, this._onDataChange, this._onViewChange);
    this._creatingPoint.render(EMPTY_POINT, pointControllerMode.CREATING);
  }

  _deletePoint(point) {
    this._api.deletePoint(point.id)
      .then(() => {
        this._pointsModel.removePoint(point.id);
        this._rerender();
      });
  }

  _addPoint(pointController, nextPoint) {
    this._api.createPoint(nextPoint)
      .then((pointModel) => {
        this._pointsModel.addPoint(pointModel);
        this._rerender();
      });
  }

  _editPoint(point, nextPoint) {
    this._api.updatePoint(point.id, nextPoint)
      .then((pointModel) =>{
        const isSuccess = this._pointsModel.updatePoint(point.id, pointModel);
        if (isSuccess) {
          this._rerender();
        }
      });
  }

  _removePoints() {
    this._showedPointControllers.forEach((pointController) => pointController.destroy());
    this._showedPointControllers = [];
  }

  _rerenderHeaderInfo() {
    this._costContainer.textContent = this._pointsModel.getTotalCost();
    this._infoComponent.rerender();
  }

  _onDataChange(pointController, point, nextPoint) {
    this._creatingPoint = null;
    const isDeletingPoint = nextPoint === null;
    const isCreatingPoint = point === EMPTY_POINT;
    const isEditingPoint = point !== EMPTY_POINT && nextPoint !== null;

    if (isDeletingPoint) {
      this._deletePoint(point);
      this._rerenderHeaderInfo();
      return;
    }

    if (isCreatingPoint) {
      this._addPoint(pointController, nextPoint);
      this._rerenderHeaderInfo();
      return;
    }

    if (isEditingPoint) {
      this._editPoint(point, nextPoint);
      this._rerenderHeaderInfo();
      return;
    }
  }

  _onViewChange() {
    this._showedPointControllers.forEach((controller) => controller.setDefaultView());
  }

  _onSortTypeChange(sortType) {
    let sortedPoints = [];
    const points = this._pointsModel.getPoints();

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

    this._showedPointControllers = renderPoints($dayList, sortedPoints, this._destinationsModel, this._offersModel, this._onDataChange, this._onViewChange, this._isDefaultSorting);
  }

  _onFilterChange() {
    this._rerender();
  }

}

export { TripController as default };
