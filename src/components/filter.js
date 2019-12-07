import { isFirst, createElement } from '../utils';

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
  <form class="trip-filters  trip-filters--hidden" action="#" method="get">
    ${filtersTemplate}

    <button class="visually-hidden" type="submit">Accept filter</button>
  </form>
  `);
};

export default class Filter {
  constructor(filters) {
    this._filters = filters;
    this._element = null;
  }

  getTemplate() {
    return getFiltersTemplate(this._filters);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
