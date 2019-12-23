import { cities, types } from '../const';

const POINTS_COUNT = 5;

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
  const diffValue = getRandomIntegerNumber(0, 60);

  targetDate.setHours(targetDate.getHours() + diffValue);

  return targetDate;
};

const generatePoint = () => {
  const startTime = getRandomDate();
  const duration = getRandomIntegerNumber(30, 120) * 60 * 1000;
  const endTime = new Date(startTime.valueOf() + duration);

  return {
    type: getRandomArrayItem(types),
    city: getRandomArrayItem(cities),
    pictures: new Array(getRandomIntegerNumber(1, COUNT_PICTURE)).fill(``).map(() => `http://picsum.photos/300/150?r=${Math.random()}`),
    description: getRandomDescription(),
    startTime,
    endTime,
    price: getRandomIntegerNumber(50, 100),
    offers: getOfferState(),
    isFavored: false,
  };
};

const generatePoints = (count) => {
  return new Array(count)
    .fill(``)
    .map(generatePoint);
};

const points = generatePoints(POINTS_COUNT);

export { points };
