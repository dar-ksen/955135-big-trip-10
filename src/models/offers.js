class OffersModel {
  constructor() {
    this._offers = [];
  }

  getOffers() {
    return this._offers;
  }

  setOffers(offers) {
    this._offers = Array.from(offers);
  }
}

export {
  OffersModel as default
};
