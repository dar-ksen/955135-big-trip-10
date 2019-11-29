import {getInfoElement} from './components/info';
import {getMenuTemplate} from './components/menu';
import {getFilterTemplate} from './components/filter';
import {getSortTemplate} from './components/sort';
import {getCardContainerTemplate} from './components/card-container';
import {getCardTemplate} from './components/card';
import {editCardTemplate} from './components/edit-card';

import {generateCards} from './mock/card';

const CARD_COUNT = 3;

const cards = generateCards(CARD_COUNT);

const tripMainElement = document.querySelector(`.js-trip-main`);
const tripInfoElement = tripMainElement.querySelector(`.js-trip-info`);
const tripConrolsElement = tripMainElement.querySelector(`.js-trip-controls`);
const tripControlsHeaderElements = tripConrolsElement.querySelectorAll(`.js-trip-controls-heading`);
const tripEventsElement = document.querySelector(`.js-trip-events`);


const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

render(tripInfoElement, getInfoElement(), `afterbegin`);
render(tripControlsHeaderElements[0], getMenuTemplate(), `afterend`);
render(tripControlsHeaderElements[1], getFilterTemplate(), `afterend`);
render(tripEventsElement, getSortTemplate());
render(tripEventsElement, getCardContainerTemplate());

const tripEventListElement = tripEventsElement.querySelector(`.js-trip-events__list`);
render(tripEventListElement, editCardTemplate(cards[0]));

cards.forEach((card) => render(tripEventListElement, getCardTemplate(card)));
