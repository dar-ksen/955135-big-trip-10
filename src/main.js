import InfoComponent from './components/info';
import MenuComponent, { MenuItem } from './components/menu';
import StatisticsComponent from './components/statistics';
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
const $bodyContainer = document.querySelector(`.js-page-body__container`);
const menuComponent = new MenuComponent();
const statisticsComponent = new StatisticsComponent();

renderComponent($controlHeaders[0], menuComponent, RenderPosition.AFTER);

const pointModel = new PointModel();
pointModel.setPoints(points);

const filterController = new FilterController($controlHeaders[1], pointModel);
filterController.render();

renderComponent($info, new InfoComponent(points), RenderPosition.AFTER_BEGIN);
const $event = document.querySelector(`.js-trip-events`);

renderComponent($bodyContainer, statisticsComponent);
statisticsComponent.hide();

const tripController = new TripController($event, pointModel);

tripController.render(points);

menuComponent.setChangeHandler((menuItem) => {
  switch (menuItem) {
    case MenuItem.TABLE:
      menuComponent.setActiveItem(MenuItem.TABLE);
      tripController.show();
      statisticsComponent.hide();
      break;
    case MenuItem.STATS:
      menuComponent.setActiveItem(MenuItem.STATS);
      statisticsComponent.show();
      tripController.hide();
      break;
  }
});

const cost = points
              .map(({ price }) => price)
              .reduce((sum, price) => sum + price);

const $cost = document.querySelector(`.js-trip-info__cost-value`);

$cost.textContent = cost;
