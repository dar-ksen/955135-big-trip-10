import API from './api';
import MenuComponent, { MenuItem } from './components/menu';
import StatisticsComponent from './components/statistics';
import FilterController from './controllers/filter';

import PointsModel from './models/points';
import DestinationsModel from './models/destinations';
import OffersModel from './models/offers';

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
const destinationsModel = new DestinationsModel();
const offersModel = new OffersModel();
const statisticsComponent = new StatisticsComponent(pointsModel);

const filterController = new FilterController($controlHeaders[1], pointsModel);
filterController.render();

const $event = document.querySelector(`.js-trip-events`);

renderComponent($bodyContainer, statisticsComponent);
statisticsComponent.hide();

const tripController = new TripController($event, $info, pointsModel, destinationsModel, offersModel, api);

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
  })
  .then(()=> {
    api.getDestinations()
      .then((destinations) => {
        destinationsModel.setDestinations(destinations);
      });
  })
  .then(()=> {
    api.getOffers()
      .then((offers) => {
        offersModel.setOffers(offers);
        tripController.render();
      });
  });

