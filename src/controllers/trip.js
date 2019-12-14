import SortComponent, { SortType } from '../components/sort';
import DayListComponent from '../components/day-list';
import DayComponent from '../components/day';
import SortEventsComponent from '../components/sort-events';

import NoEventsMessageComponent from '../components/no-events-message';

import { getDate, getUnique } from '../utils/common';

import EventComponent from '../components/event';
import EventEditComponent from '../components/event-edit';

import { renderComponent, replace } from '../utils/render';

const sortByDurationInDescendingOrder = (a, b) => (b.endTime - b.startTime) - (a.endTime - a.startTime);

const sortByPriceInDescendingOrder = (a, b) => b.price - a.price;

const sortPurely = (collection, iterate) => collection.slice().sort(iterate);

const renderEvent = (eventListElement, event) => {
  const onEscKeyDown = (evt) => {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      startEventEditing();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  const startEventEditing = () => replace(eventComponent, eventEditComponent);

  const stopEventEditing = () => replace(eventEditComponent, eventComponent);


  const eventComponent = new EventComponent(event);
  eventComponent.setEditButtonClickHandler(() => {
    stopEventEditing();
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  const eventEditComponent = new EventEditComponent(event);

  eventEditComponent.setSubmitHandler(startEventEditing);

  renderComponent(eventListElement, eventComponent);
};

const renderDays = (dayListElement, events) => {
  const days = getUnique(events.map((event) => getDate(event.startTime)));

  days.forEach((day) => {
    const dayComponent = new DayComponent(day);
    renderComponent(dayListElement, dayComponent);
    const eventList = dayComponent.getElement().querySelector(`.js-trip-events__list`);
    events
      .filter((event) => getDate(event.startTime) === day)
      .forEach((event) => renderEvent(eventList, event));
  });
};

const renderSortEvents = (dayListElement, events) => {
  const sortEventsComponent = new SortEventsComponent();
  renderComponent(dayListElement, sortEventsComponent);
  const eventList = sortEventsComponent.getElement().querySelector(`.js-trip-events__list`);
  events
    .forEach((event) => renderEvent(eventList, event));
};

export default class TripController {
  constructor(container) {
    this._container = container;

    this._noEventsMessageComponent = new NoEventsMessageComponent();
    this._sortComponent = new SortComponent();
    this._dayListComponent = new DayListComponent();
  }

  render(events) {


    if (events.length === 0) {
      renderComponent(this._container, this._noEventsMessageComponent);
      return;
    }

    renderComponent(this._container, this._sortComponent);

    const dayListElement = this._dayListComponent.getElement();

    renderComponent(this._container, this._dayListComponent);

    renderDays(dayListElement, events);

    this._sortComponent.setSortTypeChangeHandler((sortType) => {
      let sortedEvent = [];

      switch (sortType) {
        case SortType.TIME: {
          sortedEvent = sortPurely(events, sortByDurationInDescendingOrder);
          break;
        }
        case SortType.PRICE: {
          sortedEvent = sortPurely(events, sortByPriceInDescendingOrder);
          break;
        }
        case SortType.DEFAULT:
        default : {
          sortedEvent = events;
          break;
        }
      }

      dayListElement.innerHTML = ``;

      if (sortType === SortType.DEFAULT) {
        renderDays(dayListElement, sortedEvent);
      } else {
        renderSortEvents(dayListElement, sortedEvent);
      }

    });
  }
}
