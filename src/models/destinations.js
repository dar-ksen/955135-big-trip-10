class DestinationsModel {
  constructor() {
    this._destinations = [];
  }

  getDestinations() {
    return this._destinations;
  }

  getDestinationsNames() {
    return [...new Set(this._destinations.map(({ name }) => name))];
  }

  setDestinations(destinations) {
    this._destinations = Array.from(destinations);
  }
}

export {
  DestinationsModel as default
};
