import { getInfoElement } from './components/info';
import { getMenuTemplate } from './components/menu';
import { getFilterTemplate } from './components/filter';
import { getSortTemplate } from './components/sort';
import { getCardContainerTemplate } from './components/card-container';
import { getCardTemplate } from './components/card';
import { editCardTemplate } from './components/edit-card';

import { filterItem } from './mock/filter';
import { Cards as cards } from './mock/card';

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
render(tripControlsHeaderElements[1], getFilterTemplate(filterItem), `afterend`);
render(tripEventsElement, getSortTemplate());
render(tripEventsElement, getCardContainerTemplate());

const tripEventListElement = tripEventsElement.querySelector(`.js-trip-events__list`);
render(tripEventListElement, editCardTemplate(cards[0]));

cards.slice(1).forEach((card) => render(tripEventListElement, getCardTemplate(card)));

const cost = cards.map(({ price }) => price).reduce((sum, price) => sum + price);

const costPlace = document.querySelector(`.trip-info__cost-value`);
costPlace.textContent = cost;

