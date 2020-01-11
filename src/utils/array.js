const getFirst = (array) => array[0];

const getLast = (array) => array[array.length - 1];

const getUnique = (array) => [...new Set(array)];

const sortPurely = (array, iterate) => array.slice().sort(iterate);

const replace = (array, replacement, index) => [...array.slice(0, index), replacement, ...array.slice(index + 1)];

const ArrayUtils = {
  getFirst,
  getLast,
  getUnique,
  sortPurely,
  replace
};

export { ArrayUtils };
