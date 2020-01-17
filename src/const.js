const TYPE_ATTRIBUTES = {
  'taxi': {
    title: `Taxi`,
    placeholder: `to`,
  },
  'bus': {
    title: `Bus`,
    placeholder: `to`,
  },
  'train': {
    title: `Train`,
    placeholder: `to`,
  },
  'ship': {
    title: `Ship`,
    placeholder: `to`,
  },
  'transport': {
    title: `Transport`,
    placeholder: `to`,
  },
  'drive': {
    title: `Drive`,
    placeholder: `to`,
  },
  'flight': {
    title: `Flight`,
    placeholder: `to`
  },
  'check-in': {
    title: `Check`,
    placeholder: `into`
  },
  'sightseeing': {
    title: `Sightseeing`,
    placeholder: `at`
  },
  'restaurant': {
    title: `Restaurant`,
    placeholder: `at`
  }
};

const transferTypes = [`taxi`, `bus`, `train`, `ship`, `transport`, `drive`, `flight`];

const activityTypes = [`check-in`, `sightseeing`, `restaurant`];

const offerList = {
  luggage:
  {
    title: `Add luggage`,
    price: 30,
  },
  comfort:
  {
    title: `Switch to comfort class`,
    price: 100,
  },
  meal:
  {
    title: `Add meal`,
    price: 15,
  },
  seats:
  {
    title: `Choose seats`,
    price: 5,
  },
  train:
  {
    title: `Travel by train`,
    price: 40,
  }
};

const FilterType = {
  EVERYTHING: `everything`,
  FUTURE: `future`,
  PAST: `past`
};

const HIDDEN_CLASS = `visually-hidden`;

export {
  TYPE_ATTRIBUTES,
  transferTypes,
  activityTypes,
  offerList,
  FilterType,
  HIDDEN_CLASS
};
