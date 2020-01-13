import PointModel from "./models/point";

const METHOD = {
  GET: `GET`,
  POST: `POST`,
  PUT: `PUT`,
  DELETE: `DELETE`,
};

const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    throw new Error(`${response.status}: ${response.statusText}`);
  }
};

const API = class {
  constructor(endPoint, authorization) {
    this._endPoint = endPoint;
    this._authorization = authorization;
  }

  getPoints() {
    return this._load({ url: `points` })
      .then((response) => response.json())
      .then(PointModel.parsePoints);
  }

  /* :TODO
    createPoint(point) {
    }
  */

  updatePoint(id, data) {
    return this._load({
      url: `points/${id}`,
      method: METHOD.PUT,
      body: JSON.stringify(data.toRAW()),
      headers: new Headers({ 'Content-Type': `application/json` })
    })
      .then((response) => response.json())
      .then(PointModel.parsePoint);
  }

  /* :TODO
    deletePoint(id) {
    }
  */

  getDestinations() {
    return this._load({ url: `destinations` })
      .then((response) => response.json())
      .then();
  }

  getOffers() {
    return this._load({ url: `offers` })
      .then((response) => response.json())
      .then();
  }

  _load({ url, method = METHOD.GET, body = null, headers = new Headers() }) {
    headers.append(`Authorization`, this._authorization);

    return fetch(`${this._endPoint}/${url}`, { method, body, headers })
      .then(checkStatus)
      .catch((err) => {
        throw err;
      });
  }
};

export {
  API as default
};
