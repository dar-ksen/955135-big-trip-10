const cities = [
  `Amsterdam`,
  `Geneva`,
  `Barcelona`,
  `Dresden`,
  `Praha`
];

const transferTypes = [
  {
    id: `taxi`,
    title: `Taxi`,
    placeholder: `to`
  },
  {
    id: `bus`,
    title: `Bus`,
    placeholder: `to`
  },
  {
    id: `train`,
    title: `Train`,
    placeholder: `to`
  },
  {
    id: `ship`,
    title: `Ship`,
    placeholder: `to`
  },
  {
    id: `transport`,
    title: `Transport`,
    placeholder: `to`
  },
  {
    id: `drive`,
    title: `Drive`,
    placeholder: `to`
  },
  {
    id: `flight`,
    title: `Flight`,
    placeholder: `to`
  },
];

const activityTypes = [
  {
    id: `check-in`,
    title: `Check`,
    placeholder: `into`
  },
  {
    id: `sightseeing`,
    title: `Sightseeing`,
    placeholder: `at`
  },
  {
    id: `restaurant`,
    title: `Restaurant`,
    placeholder: `at`
  },
];

const types = [...transferTypes, ...activityTypes];

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

export {
  cities,
  transferTypes,
  activityTypes,
  types,
  offerList
};
