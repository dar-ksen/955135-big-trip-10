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

export { formatTime, getTwoDigitFormat, formatDate, isFirst, getFirst, getLast };
