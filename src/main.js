import InfoComponent from './components/info';
import MenuComponent from './components/menu';
import FilterComponent from './components/filter';

import PointModel from './models/point-model';

import TripController from './controllers/trip';

import { renderComponent, RenderPosition } from './utils/render';

import { filterItem } from './mock/filter';
import { points } from './mock/points';

const pointModel = new PointModel();
pointModel.setPoints(points);

const $main = document.querySelector(`.js-trip-main`);
const $info = $main.querySelector(`.js-trip-info`);
const $control = $main.querySelector(`.js-trip-controls`);
const $controlHeaders = $control.querySelectorAll(`.js-trip-controls-heading`);

renderComponent($controlHeaders[0], new MenuComponent(), RenderPosition.AFTER);
renderComponent($controlHeaders[1], new FilterComponent(filterItem), RenderPosition.AFTER);
renderComponent($info, new InfoComponent(points), RenderPosition.AFTER_BEGIN);

const $event = document.querySelector(`.js-trip-events`);

const tripController = new TripController($event, pointModel);

tripController.render(points);

const cost = points
              .map(({ price }) => price)
              .reduce((sum, price) => sum + price);

const $cost = document.querySelector(`.js-trip-info__cost-value`);

$cost.textContent = cost;
