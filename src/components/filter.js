import AbstractComponent from './abstract-component';

const FILTER_ID_PREFIX = `filter-`;

const getFilterNameById = (id) => {
  return id.substring(FILTER_ID_PREFIX.length);
};

const getFilterTemplate = (filter, isChecked) => {
  const { name } = filter;

  return (
    `<div class="trip-filters__filter">
      <input id="filter-${name}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${name}" ${isChecked ? `checked` : ``}>
      <label class="trip-filters__filter-label" for="filter-${name}">${name}</label>
    </div>`
  );
};

const getFiltersTemplate = (filters) => {
  const filtersTemplate = filters.map((filter) => getFilterTemplate(filter, filter.checked)).join(`\n`);
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

  setFilterChangeHandler(handler) {
    this.getElement().addEventListener(`change`, (evt) => {
      const filterName = getFilterNameById(evt.target.id);
      handler(filterName);
    });
  }
}

export { Filter as default };
