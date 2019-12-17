const getTwoDigitFormat = (value) => String(value).padStart(2, `0`);

const formatterOptionsTime = {
  hour12: false,
  hour: `2-digit`,
  minute: `2-digit`,
};

const TimeFormatter = new Intl.DateTimeFormat(`en-US`, formatterOptionsTime);

const formatTime = (date) => TimeFormatter.format(date);

const formatterOptionsDate = {
  day: `numeric`,
  month: `short`,
};

const DateFormatter = new Intl.DateTimeFormat(`en-US`, formatterOptionsDate);

const formatDate = (date) => DateFormatter.format(date);

const isFirst = (index) => index === 0;

const getFirst = (array) => array[0];

const getLast = (array) => array[array.length - 1];

const getDate = (date) => new Intl.DateTimeFormat(`en-US`).format(date);

const getUnique = (array) => [...new Set(array)];

// Sorting

const sortByDurationInDescendingOrder = (a, b) => (b.endTime - b.startTime) - (a.endTime - a.startTime);

const sortByPriceInDescendingOrder = (a, b) => b.price - a.price;

const sortPurely = (collection, iterate) => collection.slice().sort(iterate);

export {
  getTwoDigitFormat,
  formatTime,
  formatDate,
  isFirst,
  getFirst,
  getLast,
  getDate,
  getUnique,
  sortByDurationInDescendingOrder,
  sortByPriceInDescendingOrder,
  sortPurely
};
