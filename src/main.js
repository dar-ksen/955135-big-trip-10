import InfoComponent from './components/info';
import MenuComponent from './components/menu';
import FilterComponent from './components/filter';
import SortComponent from './components/sort';
import DayListComponent from './components/day-list';
import SortCardsComponent from './components/sort-cards';
import CardComponent from './components/card';
import CardEditComponent from './components/card-edit';

import { render, RenderPosition } from './utils';

import { filterItem } from './mock/filter';
import { cards } from './mock/card';

const renderCard = (cardListElement, card) => {
  const onEscKeyDown = (evt) => {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      replaceEditToTask();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  const replaceEditToTask = () => {
    cardListElement.replaceChild(cardComponent.getElement(), cardEditComponent.getElement());
  };

  const replaceTaskToEdit = () => {
    cardListElement.replaceChild(cardEditComponent.getElement(), cardComponent.getElement());
  };

  const cardComponent = new CardComponent(card);
  const editButton = cardComponent.getElement().querySelector(`.event__rollup-btn`);

  editButton.addEventListener(`click`, () => {
    replaceTaskToEdit();
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  const cardEditComponent = new CardEditComponent(card);
  const editForm = cardEditComponent.getElement().querySelector(`form`);

  editForm.addEventListener(`submit`, replaceEditToTask);

  render(cardListElement, cardComponent.getElement(), RenderPosition.BEFOREEND);
};

const tripMainElement = document.querySelector(`.js-trip-main`);
const tripInfoElement = tripMainElement.querySelector(`.js-trip-info`);
const tripConrolsElement = tripMainElement.querySelector(`.js-trip-controls`);
const tripControlsHeaderElements = tripConrolsElement.querySelectorAll(`.js-trip-controls-heading`);
const tripEventsElement = document.querySelector(`.js-trip-events`);

render(tripInfoElement, new InfoComponent(cards).getElement(), RenderPosition.AFTERBEGIN);
render(tripControlsHeaderElements[0], new MenuComponent().getElement(), RenderPosition.AFTER);
render(tripControlsHeaderElements[1], new FilterComponent(filterItem).getElement(), RenderPosition.AFTER);
render(tripEventsElement, new SortComponent().getElement(), RenderPosition.BEFOREEND);

const dayList = new DayListComponent().getElement();

render(tripEventsElement, dayList, RenderPosition.BEFOREEND);

const sortContainer = new SortCardsComponent(cards).getElement();
const sortContainerElement = sortContainer.querySelector(`.js-trip-events__list`);
render(dayList, sortContainer, RenderPosition.BEFOREEND);
cards.map((card) => renderCard(sortContainerElement, card));

const cost = cards.map(({ price }) => price).reduce((sum, price) => sum + price);

const costPlace = document.querySelector(`.trip-info__cost-value`);

costPlace.textContent = cost;

/*
render(tripEventsElement, getCardContainerTemplate());

const tripEventListElement = tripEventsElement.querySelector(`.js-trip-days`);

let cardtListTemlate = createDaysTemplate(cards);

render(tripEventListElement, cardtListTemlate);


// TODO: Add filter to check sorting

const tripSort = document.querySelector(`.js-trip-sort`);

const chooseSort = {
  'sort-event': () => createDaysTemplate(cards),
  'sort-time': () => sortCardTemplate(cards.slice().sort((a, b) => a.startTime - b.startTime)),
  'sort-price': () => sortCardTemplate(cards.slice().sort((a, b) => a.price - b.price)),
};

tripSort.addEventListener(`change`, function () {
  const checked = tripSort.querySelector(`input:checked`).id;
  tripEventListElement.textContent = ``;
  cardtListTemlate = chooseSort[checked]();
  render(tripEventListElement, cardtListTemlate);
});

*/
