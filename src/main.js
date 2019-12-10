import InfoComponent from './components/info';
import MenuComponent from './components/menu';
import FilterComponent from './components/filter';

import SortComponent from './components/sort';
import DayListComponent from './components/day-list';
import DayComponent from './components/day';

import NoCardsMessageComponent from './components/no-cards-message';

import CardComponent from './components/card';
import CardEditComponent from './components/card-edit';


import { renderComponent, RenderPosition, getDate, unique } from './utils';

import { filterItem } from './mock/filter';
import { cards } from './mock/card';

const renderCard = (cardListElement, card) => {
  const onEscKeyDown = (evt) => {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      startCardEditing();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  const startCardEditing = () => {
    cardListElement.replaceChild(cardComponent.getElement(), cardEditComponent.getElement());
  };

  const stopCardEditing = () => {
    cardListElement.replaceChild(cardEditComponent.getElement(), cardComponent.getElement());
  };

  const cardComponent = new CardComponent(card);
  const editButton = cardComponent.getElement().querySelector(`.js-event__rollup-btn`);

  editButton.addEventListener(`click`, () => {
    stopCardEditing();
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  const cardEditComponent = new CardEditComponent(card);
  const editForm = cardEditComponent.getElement().querySelector(`.js-event--edit`);

  editForm.addEventListener(`submit`, startCardEditing);

  renderComponent(cardListElement, cardComponent, RenderPosition.BEFORE_END);
};

const tripMainElement = document.querySelector(`.js-trip-main`);
const tripInfoElement = tripMainElement.querySelector(`.js-trip-info`);
const tripConrolsElement = tripMainElement.querySelector(`.js-trip-controls`);
const tripControlsHeaderElements = tripConrolsElement.querySelectorAll(`.js-trip-controls-heading`);

renderComponent(tripControlsHeaderElements[0], new MenuComponent(), RenderPosition.AFTER);
renderComponent(tripControlsHeaderElements[1], new FilterComponent(filterItem), RenderPosition.AFTER);

const tripEventsElement = document.querySelector(`.js-trip-events`);

if (cards.length === 0) {
  const noCardsMessageComponent = new NoCardsMessageComponent();
  renderComponent(tripEventsElement, noCardsMessageComponent, RenderPosition.BEFORE_END);
} else {
  renderComponent(tripInfoElement, new InfoComponent(cards), RenderPosition.AFTER_BEGIN);
  renderComponent(tripEventsElement, new SortComponent(), RenderPosition.BEFORE_END);

  const dayListComponent = new DayListComponent();
  const dayListElement = dayListComponent.getElement();

  renderComponent(tripEventsElement, dayListComponent, RenderPosition.BEFORE_END);

  const days = unique(cards.map((card) => getDate(card.startTime)));

  days.forEach((day) => {
    const dayComponent = new DayComponent(day);
    renderComponent(dayListElement, dayComponent, RenderPosition.BEFORE_END);
    const eventList = dayComponent.getElement().querySelector(`.js-trip-events__list`);
    cards.filter((card) => getDate(card.startTime) === day).forEach((card) => renderCard(eventList, card));
  });

  const cost = cards.map(({ price }) => price).reduce((sum, price) => sum + price);

  const costPlace = document.querySelector(`.trip-info__cost-value`);

  costPlace.textContent = cost;
}

// TODO: Add for sorting
/*
const sortContainer = new SortCardsComponent(cards).getElement();
const sortContainerElement = sortContainer.querySelector(`.js-trip-events__list`);
render(dayList, sortContainer, RenderPosition.BEFORE_END);
cards.map((card) => renderCard(sortContainerElement, card));
*/

/*
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
