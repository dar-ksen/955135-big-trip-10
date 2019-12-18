import AbstractComponent from './abstract-component';

import { isFirst } from '../utils/common';

const getFilterTemplate = (filter, isChecked) => {
  const { name, title } = filter;

  return (
    `<div class="trip-filters__filter">
      <input id="filter-${name}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${name}" ${isChecked ? `checked` : ``}>
      <label class="trip-filters__filter-label" for="filter-${name}">${title}</label>
    </div>`
  );
};

const getFiltersTemplate = (filters) => {
  const filtersTemplate = filters.map((filter, index) => getFilterTemplate(filter, isFirst(index))).join(`\n`);
  return (`
  <form class="trip-filters" action="#" method="get">
    ${filtersTemplate}

    <button class="visually-hidden" type="submit">Accept filter</button>
  </form>
  `);
};

class Filter extends AbstractComponent {
  constructor(filters) {
    super();

    this._filters = filters;
  }

  getTemplate() {
    return getFiltersTemplate(this._filters);
  }
}

export { Filter as default };
