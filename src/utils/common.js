import { format } from 'date-fns';

const getTwoDigitFormat = (value) => String(value).padStart(2, `0`);

const formatTime = (date) => format(date, `kk:mm`);

const formatDate = (date) => format(date, `LLL dd`);

const isFirst = (index) => index === 0;

const getDate = (date) => new Intl.DateTimeFormat(`en-US`).format(date);

export {
  getTwoDigitFormat,
  formatTime,
  formatDate,
  isFirst,
  getDate,
};
