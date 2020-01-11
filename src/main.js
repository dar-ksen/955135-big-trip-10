import InfoComponent from './components/info';
import MenuComponent from './components/menu';
import FilterController from './controllers/filter';

import PointModel from './models/point-model';

import TripController from './controllers/trip';

import { renderComponent, RenderPosition } from './utils/render';

import { points } from './mock/points';

const addButton = document.querySelector(`.js-trip-main__event-add-btn`);
addButton.addEventListener(`click`, () => {
  tripController.createPoint();
});

const $main = document.querySelector(`.js-trip-main`);
const $info = $main.querySelector(`.js-trip-info`);
const $control = $main.querySelector(`.js-trip-controls`);
const $controlHeaders = $control.querySelectorAll(`.js-trip-controls-heading`);

renderComponent($controlHeaders[0], new MenuComponent(), RenderPosition.AFTER);

const pointModel = new PointModel();
pointModel.setPoints(points);

const filterController = new FilterController($controlHeaders[1], pointModel);
filterController.render();

renderComponent($info, new InfoComponent(points), RenderPosition.AFTER_BEGIN);

const $event = document.querySelector(`.js-trip-events`);

const tripController = new TripController($event, pointModel);

tripController.render(points);

const cost = points
              .map(({ price }) => price)
              .reduce((sum, price) => sum + price);

const $cost = document.querySelector(`.js-trip-info__cost-value`);

$cost.textContent = cost;
