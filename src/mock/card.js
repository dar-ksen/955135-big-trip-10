const Types = [
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

const Cities = [
  `Amsterdam`,
  `Geneva`,
  `Barcelona`,
  `Dresden`,
  `Praha`
];

const DescriptionsItems = [
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
  `Cras aliquet varius magna, non porta ligula feugiat eget.`,
  `Fusce tristique felis at fermentum pharetra.`,
  `Aliquam id orci ut lectus varius viverra.`,
  `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
  `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
  `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
  `Sed sed nisi sed augue convallis suscipit in sed felis.`,
  `Aliquam erat volutpat.`,
  `Nunc fermentum tortor ac porta dapibus.`,
  `In rutrum ac purus sit amet tempus.`,
];

const getRandomIntegerNumber = (min, max) => {
  return min + Math.floor(max * Math.random());
};

const getRandomArrayItem = (array) => {
  const randomIndex = getRandomIntegerNumber(0, array.length);

  return array[randomIndex];
};

const getRandomDescription = () => {
  const descriptionLength = getRandomIntegerNumber(1, 3);
  const description = new Set();
  for (let i = 0; i < descriptionLength; i++) {
    description.add(getRandomArrayItem(DescriptionsItems));
  }
  return Array.from(description).join(` `);
};

/*
const COUNT_PICTURE = 5;

const getOfferState = () => {
  return {
    luggage: Math.random() > 0.5,
    comfort: Math.random() > 0.5,
    meal: false,
    seats: false,
    train: false,
  };
};

const getRandomDate = () => {
  const targetDate = new Date();
  const diffValue = getRandomIntegerNumber(0, 15);

  targetDate.setHours(targetDate.getHours() + diffValue);

  return targetDate;
};

const generateCard = () => {
  const startTime = getRandomDate();
  const duration = getRandomIntegerNumber(30, 120) * 60 * 1000;
  const endTime = new Date(startTime.valueOf() + duration);

  return {
    type: getRandomArrayItem(Types),
    city: getRandomArrayItem(Cities),
    pictures: new Array(COUNT_PICTURE).fill(``).map(() => `http://picsum.photos/300/150?r=${Math.random()}`),
    description: getRandomDescription(),
    startTime,
    endTime,
    price: getRandomIntegerNumber(50, 100),
    offers: getOfferState(),
  };
};

const generateCards = (count) => {
  return new Array(count)
    .fill(``)
    .map(generateCard).sort((a, b) => a.startTime - b.startTime);
}; */

const Cards = [
  {
    type: Types[0],
    city: Cities[0],
    pictures: new Array(3).fill(``).map(() => `http://picsum.photos/300/150?r=${Math.random()}`),
    description: getRandomDescription(),
    startTime: new Date(Date.UTC(2019, 10, 5, 5, 45)),
    endTime: new Date(Date.UTC(2019, 10, 5, 6, 45)),
    price: 40,
    offers: { luggage: false, comfort: false, meal: true, seats: true, train: false },
  },
  {
    type: Types[1],
    city: Cities[3],
    pictures: new Array(3).fill(``).map(() => `http://picsum.photos/300/150?r=${Math.random()}`),
    description: getRandomDescription(),
    startTime: new Date(Date.UTC(2019, 10, 5, 7, 45)),
    endTime: new Date(Date.UTC(2019, 10, 5, 9, 30)),
    price: 50,
    offers: { luggage: false, comfort: true, meal: false, seats: false, train: false },
  },
  {
    type: Types[2],
    city: Cities[2],
    pictures: new Array(4).fill(``).map(() => `http://picsum.photos/300/150?r=${Math.random()}`),
    description: getRandomDescription(),
    startTime: new Date(Date.UTC(2019, 10, 5, 5, 30)),
    endTime: new Date(Date.UTC(2019, 10, 6, 6, 0)),
    price: 150,
    offers: { luggage: false, comfort: false, meal: false, seats: true, train: false },
  },
  {
    type: Types[3],
    city: Cities[4],
    pictures: new Array(1).fill(``).map(() => `http://picsum.photos/300/150?r=${Math.random()}`),
    description: getRandomDescription(),
    startTime: new Date(Date.UTC(2019, 10, 5, 5, 45)),
    endTime: new Date(Date.UTC(2019, 10, 10, 5, 45)),
    price: 50,
    offers: { luggage: false, comfort: false, meal: true, seats: false, train: true },
  },
];

export { Cards };
