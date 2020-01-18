import { getPointsByFilter } from '../services/point-filtration';
import { FilterType } from '../const';
import { ArrayUtils } from '../utils/array';

class PointsModel {
  constructor() {
    this._points = [];
    this._activeFilterType = FilterType.EVERYTHING;
    this._dataChangeHandlers = [];
    this._filterChangeHandlers = [];
  }

  getPoints() {
    return getPointsByFilter(this._points, this._activeFilterType);
  }

  getTotalCost() {
    return this._points
      .reduce((sum, point) => sum + point.price + point.offers
        .reduce((sumOfferPrice, offer) => sumOfferPrice + offer.price, 0), 0);
  }

  setPoints(points) {
    this._points = Array.from(points);
  }

  setFilter(filterType) {
    this._activeFilterType = filterType;
    this._filterChangeHandlers.forEach((handler) => handler());
  }

  removePoint(id) {
    const points = this._points.filter((point) => point.id !== id);

    if (points.length === this._points.length) {
      return false;
    }

    this._points = points;

    this._callHandlers(this._dataChangeHandlers);

    return true;
  }

  updatePoint(id, updatedPoint) {
    const index = this._points.findIndex((point) => point.id === id);

    if (index === -1) {
      return false;
    }

    this._points = ArrayUtils.replace(this._points, updatedPoint, index);
    this._dataChangeHandlers.forEach((handler) => handler());

    return true;
  }

  addPoint(point) {
    this._points = [point, ...this._points];
    this._callHandlers(this._dataChangeHandlers);
  }

  setFilterChangeHandler(handler) {
    this._filterChangeHandlers.push(handler);
  }

  _callHandlers(handlers) {
    handlers.forEach((handler) => handler());
  }
}

export { PointsModel as default };
