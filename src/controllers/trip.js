import SortComponent, { SortType } from '../components/sort';
import DayListComponent from '../components/day-list';
import DayComponent from '../components/day';
import SortEventsComponent from '../components/sort-events';
import PointController from './point.js';

import NoEventsMessageComponent from '../components/no-events-message';

import {
  getDate,
  getUnique,
  sortByDurationInDescendingOrder,
  sortByPriceInDescendingOrder,
  sortPurely } from '../utils/common';

import { renderComponent } from '../utils/render';

const renderPoints = (eventList, points, onDataChange, onViewChange) => {
  return points.map((pointData) => {
    const pointController = new PointController(eventList, onDataChange, onViewChange);
    pointController.render(pointData);

    return pointController;
  });
};

export default class TripController {
  constructor(container) {
    this._container = container;
    this._points = [];
    this._showedPointControllers = [];

    this._onSortTypeChange = this._onSortTypeChange.bind(this);
    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);


    this._noEventsMessageComponent = new NoEventsMessageComponent();
    this._sortComponent = new SortComponent();
    this._dayListComponent = new DayListComponent();

    this._sortComponent.setSortTypeChangeHandler(this._onSortTypeChange);
  }

  render(points) {
    this._points = points;

    if (this._points.length === 0) {
      renderComponent(this._container, this._noEventsMessageComponent);
      return;
    }

    renderComponent(this._container, this._sortComponent);
    renderComponent(this._container, this._dayListComponent);

    this._renderDays(this._points);
  }

  _renderSortEvents(points) {
    const dayListElement = this._dayListComponent.getElement();
    const sortEventsComponent = new SortEventsComponent();
    renderComponent(dayListElement, sortEventsComponent);
    const eventList = sortEventsComponent.getElement().querySelector(`.js-trip-events__list`);
    const newTasks = renderPoints(eventList, points, this._onDataChange, this._onViewChange);
    this._showedPointControllers = this._showedPointControllers.concat(newTasks);
  }

  _renderDays(points) {
    const dayListElement = this._dayListComponent.getElement();

    const days = getUnique(points.map((point) => getDate(point.startTime)));

    days.forEach((day) => {
      const dayComponent = new DayComponent(day);
      renderComponent(dayListElement, dayComponent);

      const eventList = dayComponent.getElement().querySelector(`.js-trip-events__list`);

      const dayPoints = points.filter((point) => getDate(point.startTime) === day);
      const newTasks = renderPoints(eventList, dayPoints, this._onDataChange, this._onViewChange);
      this._showedPointControllers = this._showedPointControllers.concat(newTasks);
    });
  }

  _onDataChange(pointController, oldData, newData) {
    const index = this._points.findIndex((it) => it === oldData);

    if (index === -1) {
      return;
    }

    this._points = [].concat(this._points.slice(0, index), newData, this._points.slice(index + 1));

    pointController.render(this._points[index]);
    // console.log(this._points.map((point) => point.isFavorite));
  }

  _onViewChange() {
    this._showedPointControllers.forEach((it) => it.setDefaultView());
  }

  _onSortTypeChange(sortType) {
    let sortedEvent = [];

    const dayListElement = this._dayListComponent.getElement();

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

    dayListElement.innerHTML = ``;

    if (sortType === SortType.DEFAULT) {
      this._renderDays(sortedEvent);
    } else {
      this._renderSortEvents(sortedEvent);
    }

  }

}
