import InfoComponent from './components/info';
import MenuComponent from './components/menu';
import FilterComponent from './components/filter';
import TripController from './controllers/trip';

import { renderComponent, RenderPosition } from './utils/render';

import { filterItem } from './mock/filter';
import { points } from './mock/points';

const $main = document.querySelector(`.js-trip-main`);
const $info = $main.querySelector(`.js-trip-info`);
const $control = $main.querySelector(`.js-trip-controls`);
const $controlHeader = $control.querySelectorAll(`.js-trip-controls-heading`);

renderComponent($controlHeader[0], new MenuComponent(), RenderPosition.AFTER);
renderComponent($controlHeader[1], new FilterComponent(filterItem), RenderPosition.AFTER);
renderComponent($info, new InfoComponent(points), RenderPosition.AFTER_BEGIN);

const $event = document.querySelector(`.js-trip-events`);

const tripController = new TripController($event);

tripController.render(points);

const cost = points
              .map(({ price }) => price)
              .reduce((sum, price) => sum + price);

const $cost = document.querySelector(`.js-trip-info__cost-value`);

$cost.textContent = cost;
