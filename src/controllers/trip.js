import SortComponent, { SortType } from '../components/sort';
import DayListComponent from '../components/day-list';
import DayComponent from '../components/day';
import SortPointsComponent from '../components/sort-points';
import PointController from './point.js';

import NoPointsMessageComponent from '../components/no-points-message';

import {
  getDate,
  getUnique,
  sortByDurationInDescendingOrder,
  sortByPriceInDescendingOrder,
  sortPurely } from '../utils/common';

import { renderComponent } from '../utils/render';

const replace = (collection, replacement, index) => [...collection.slice(0, index), replacement, ...collection.slice(index + 1)];

const renderPoints = (eventList, points, onDataChange, onViewChange) => {
  return points.map((pointData) => {
    const pointController = new PointController(eventList, onDataChange, onViewChange);
    pointController.render(pointData);

    return pointController;
  });
};

class TripController {
  constructor(container) {
    this._container = container;
    this._points = [];
    this._showedPointControllers = [];

    this._onSortTypeChange = this._onSortTypeChange.bind(this);
    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);


    this._noPointsMessageComponent = new NoPointsMessageComponent();
    this._sortComponent = new SortComponent();
    this._dayListComponent = new DayListComponent();

    this._sortComponent.setSortTypeChangeHandler(this._onSortTypeChange);
  }

  render(points) {
    this._points = points;

    if (this._points.length === 0) {
      renderComponent(this._container, this._noPointsMessageComponent);
      return;
    }

    renderComponent(this._container, this._sortComponent);
    renderComponent(this._container, this._dayListComponent);

    this._renderDays(this._points);
  }

  _renderSortEvents(points) {
    const $dayList = this._dayListComponent.getElement();
    const sortPointsComponent = new SortPointsComponent();

    renderComponent($dayList, sortPointsComponent);

    const $pointList = sortPointsComponent.getElement().querySelector(`.js-trip-events__list`);
    const newTasks = renderPoints($pointList, points, this._onDataChange, this._onViewChange);
    this._showedPointControllers = [...this._showedPointControllers, ...newTasks];
  }

  _renderDays(points) {
    const $dayList = this._dayListComponent.getElement();

    const days = getUnique(points.map((point) => getDate(point.startTime)));

    days.forEach((day) => {
      const dayComponent = new DayComponent(day);
      renderComponent($dayList, dayComponent);

      const $pointList = dayComponent.getElement().querySelector(`.js-trip-events__list`);

      const dayPoints = points.filter((point) => getDate(point.startTime) === day);
      const newTasks = renderPoints($pointList, dayPoints, this._onDataChange, this._onViewChange);
      this._showedPointControllers = [...this._showedPointControllers, ...newTasks];
    });
  }

  _onDataChange(pointController, replaceablePoint, replacementPoint) {
    const index = this._points.findIndex((point) => point === replaceablePoint);
    this._points = replace(this._points, replacementPoint, index);

    pointController.render(this._points[index]);
    // console.log(this._points.map((point) => point.isFavored));
  }

  _onViewChange() {
    this._showedPointControllers.forEach((point) => point.setDefaultView());
  }

  _onSortTypeChange(sortType) {
    let sortedEvent = [];

    const $dayList = this._dayListComponent.getElement();

    switch (sortType) {
      case SortType.TIME: {
        sortedEvent = sortPurely(this._points, sortByDurationInDescendingOrder);
        break;
      }
      case SortType.PRICE: {
        sortedEvent = sortPurely(this._points, sortByPriceInDescendingOrder);
        break;
      }
      case SortType.DEFAULT:
      default : {
        sortedEvent = this._points;
        break;
      }
    }

    this._showedPointControllers = [];

    $dayList.innerHTML = ``;

    if (sortType === SortType.DEFAULT) {
      this._renderDays(sortedEvent);
    } else {
      this._renderSortEvents(sortedEvent);
    }

  }

}

export { TripController as default };
