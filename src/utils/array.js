const getFirst = (array) => array[0];

const getLast = (array) => array[array.length - 1];

const getUnique = (array) => [...new Set(array)];

const sortPurely = (array, iterate) => array.slice().sort(iterate);

const ArrayUtils = {
  getFirst,
  getLast,
  getUnique,
  sortPurely
};

export { ArrayUtils };
