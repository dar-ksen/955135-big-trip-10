import InfoComponent from './components/info';
import MenuComponent from './components/menu';
import FilterComponent from './components/filter';
import TripController from './controllers/trip';

import { renderComponent, RenderPosition } from './utils/render';

import { filterItem } from './mock/filter';
import { cards } from './mock/card';

const tripMainElement = document.querySelector(`.js-trip-main`);
const tripInfoElement = tripMainElement.querySelector(`.js-trip-info`);
const tripConrolsElement = tripMainElement.querySelector(`.js-trip-controls`);
const tripControlsHeaderElements = tripConrolsElement.querySelectorAll(`.js-trip-controls-heading`);

renderComponent(tripControlsHeaderElements[0], new MenuComponent(), RenderPosition.AFTER);
renderComponent(tripControlsHeaderElements[1], new FilterComponent(filterItem), RenderPosition.AFTER);
renderComponent(tripInfoElement, new InfoComponent(cards), RenderPosition.AFTER_BEGIN);

const tripEventsElement = document.querySelector(`.js-trip-events`);

const tripController = new TripController(tripEventsElement);

tripController.render(cards);

const cost = cards
              .map(({ price }) => price)
              .reduce((sum, price) => sum + price);

const costPlace = document.querySelector(`.js-trip-info__cost-value`);

costPlace.textContent = cost;
