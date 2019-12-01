import { getInfoElement } from './components/info';
import { getMenuTemplate } from './components/menu';
import { getFiltersTemplate } from './components/filter';
import { getSortTemplate } from './components/sort';
import { getCardContainerTemplate } from './components/card-container';
import { getCardTemplate } from './components/card';
import { editCardTemplate } from './components/edit-card';

import { filterItem } from './mock/filter';
import { Cards as cards } from './mock/card';

import { isFirst } from './utils';

const tripMainElement = document.querySelector(`.js-trip-main`);
const tripInfoElement = tripMainElement.querySelector(`.js-trip-info`);
const tripConrolsElement = tripMainElement.querySelector(`.js-trip-controls`);
const tripControlsHeaderElements = tripConrolsElement.querySelectorAll(`.js-trip-controls-heading`);
const tripEventsElement = document.querySelector(`.js-trip-events`);


const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

render(tripInfoElement, getInfoElement(cards), `afterbegin`);
render(tripControlsHeaderElements[0], getMenuTemplate(), `afterend`);
render(tripControlsHeaderElements[1], getFiltersTemplate(filterItem), `afterend`);
render(tripEventsElement, getSortTemplate());
render(tripEventsElement, getCardContainerTemplate());

const tripEventListElement = tripEventsElement.querySelector(`.js-trip-events__list`);

let cardtListTemlate = cards.map((card, index) => isFirst(index)
  ? editCardTemplate(card)
  : getCardTemplate(card)
).join(`\n`);

render(tripEventListElement, cardtListTemlate);

const cost = cards.map(({ price }) => price).reduce((sum, price) => sum + price);

const costPlace = document.querySelector(`.trip-info__cost-value`);
costPlace.textContent = cost;

// Чуть позже переписать

const tripSort = document.querySelector(`.js-trip-sort`);

const chooseSort = {
  'sort-event': () => cards.map((card, index) => isFirst(index)
    ? editCardTemplate(card)
    : getCardTemplate(card)
  ).join(`\n`),
  'sort-time': () =>cards.slice().sort((a, b) => a.startTime - b.startTime).map((card, index) => isFirst(index)
    ? editCardTemplate(card)
    : getCardTemplate(card)
  ).join(`\n`),
  'sort-price': () => cards.slice().sort((a, b) => a.price - b.price).map((card, index) => isFirst(index)
    ? editCardTemplate(card)
    : getCardTemplate(card)
  ).join(`\n`),

};

tripSort.addEventListener(`change`, function () {
  const checked = tripSort.querySelector(`input:checked`).id;
  tripEventListElement.textContent = ``;
  cardtListTemlate = chooseSort[checked]();
  render(tripEventListElement, cardtListTemlate);
});

