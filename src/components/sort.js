import AbstractComponent from './abstract-component';

import { isFirst } from '../utils';

const sortItems = [
  {
    id: `event`,
    title: `Event`
  },
  {
    id: `time`,
    title: `Time`
  },
  {
    id: `price`,
    title: `Price`
  }
];

const getSortListTemplate = (items) => items.map(({ id, title }, index) => `
<div class="trip-sort__item  trip-sort__item--${id}">
  <input id="sort-${id}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${id}" ${isFirst(index) ? `checked` : ``}>
  <label class="trip-sort__btn" for="sort-${id}">
  ${title}
  ${isFirst(index) ? `` : `
    <svg class="trip-sort__direction-icon" width="8" height="10" viewBox="0 0 8 10">
    <path d="M2.888 4.852V9.694H5.588V4.852L7.91 5.068L4.238 0.00999987L0.548 5.068L2.888 4.852Z"/>
    </svg>`}
  </label>
</div>
`).join(`\n`);

const getSortTemplate = () => {
  const sortListTemplate = getSortListTemplate(sortItems);
  return (`
  <form class="trip-events__trip-sort  trip-sort js-trip-sort" action="#" method="get">
    <span class="trip-sort__item  trip-sort__item--day">Day</span>

    ${sortListTemplate}

    <span class="trip-sort__item  trip-sort__item--offers">Offers</span>
  </form>
  `);
};

export default class Sort extends AbstractComponent {
  getTemplate() {
    return getSortTemplate();
  }
}

