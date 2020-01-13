import API from './api';
import InfoComponent from './components/info';
import MenuComponent, { MenuItem } from './components/menu';
import StatisticsComponent from './components/statistics';
import FilterController from './controllers/filter';

import PointsModel from './models/points';

import TripController from './controllers/trip';

import { renderComponent, RenderPosition } from './utils/render';

const AUTHORIZATION = `Basic eo0w590ik29889a`;
const END_POINT = `https://htmlacademy-es-10.appspot.com/big-trip`;

const addButton = document.querySelector(`.js-trip-main__event-add-btn`);
addButton.addEventListener(`click`, () => {
  tripController.createPoint();
});

const api = new API(END_POINT, AUTHORIZATION);
const $main = document.querySelector(`.js-trip-main`);
const $info = $main.querySelector(`.js-trip-info`);
const $control = $main.querySelector(`.js-trip-controls`);
const $controlHeaders = $control.querySelectorAll(`.js-trip-controls-heading`);
const $bodyContainer = document.querySelector(`.js-page-body__container`);
const menuComponent = new MenuComponent();

renderComponent($controlHeaders[0], menuComponent, RenderPosition.AFTER);

const pointsModel = new PointsModel();
const statisticsComponent = new StatisticsComponent(pointsModel);

const filterController = new FilterController($controlHeaders[1], pointsModel);
filterController.render();

// renderComponent($info, new InfoComponent(points), RenderPosition.AFTER_BEGIN);
const $event = document.querySelector(`.js-trip-events`);

renderComponent($bodyContainer, statisticsComponent);
statisticsComponent.hide();

const tripController = new TripController($event, pointsModel);

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

api.getPoints()
  .then((points) => {
    pointsModel.setPoints(points);
    tripController.render();
    renderComponent($info, new InfoComponent(points), RenderPosition.AFTER_BEGIN);
    console.log(pointsModel);
  });
/*
const cost = points
              .map(({ price }) => price)
              .reduce((sum, price) => sum + price);

const $cost = document.querySelector(`.js-trip-info__cost-value`);

$cost.textContent = cost;
*/
