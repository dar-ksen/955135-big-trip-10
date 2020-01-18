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
  FilterType,
  HIDDEN_CLASS
};
