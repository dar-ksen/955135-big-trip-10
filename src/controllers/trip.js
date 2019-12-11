import SortComponent from '../components/sort';
import DayListComponent from '../components/day-list';
import DayComponent from '../components/day';

import NoCardsMessageComponent from '../components/no-cards-message';

import { getDate, getUnique } from '../utils/common';

import CardComponent from '../components/card';
import CardEditComponent from '../components/card-edit';

import { renderComponent, replace } from '../utils/render';

const renderCard = (cardListElement, card) => {
  const onEscKeyDown = (evt) => {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      startCardEditing();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  const startCardEditing = () => replace(cardComponent, cardEditComponent);

  const stopCardEditing = () => replace(cardEditComponent, cardComponent);


  const cardComponent = new CardComponent(card);
  cardComponent.setEditButtonClickHandler(() => {
    stopCardEditing();
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  const cardEditComponent = new CardEditComponent(card);

  cardEditComponent.setSubmitHandler(startCardEditing);

  renderComponent(cardListElement, cardComponent);
};

export default class TripController {
  constructor(container) {
    this._container = container;

    this._noCardsMessageComponent = new NoCardsMessageComponent();
    this._sortComponent = new SortComponent();
    this._dayListComponent = new DayListComponent();
  }

  render(cards) {


    if (cards.length === 0) {
      renderComponent(this._container, this._noCardsMessageComponent);
      return;
    }

    renderComponent(this._container, this._sortComponent);

    const dayListElement = this._dayListComponent.getElement();

    renderComponent(this._container, this._dayListComponent);

    const days = getUnique(cards.map((card) => getDate(card.startTime)));

    days.forEach((day) => {
      const dayComponent = new DayComponent(day);
      renderComponent(dayListElement, dayComponent);
      const eventList = dayComponent.getElement().querySelector(`.js-trip-events__list`);
      cards
        .filter((card) => getDate(card.startTime) === day)
        .forEach((card) => renderCard(eventList, card));
    });
  }
}
