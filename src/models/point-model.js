import { ArrayUtils } from '../utils/array';

class PointModel {
  constructor() {
    this._points = [];
  }

  getPoints() {
    return this._points;
  }

  setPoints(points) {
    this._points = Array.from(points);
  }

  updatePoint(id, updatedPoint) {
    const index = this._points.findIndex((point) => point.id === id);

    if (index === -1) {
      return false;
    }

    this._points = ArrayUtils.replace(this._points, updatedPoint, index);

    return true;
  }
}

export { PointModel as default };
