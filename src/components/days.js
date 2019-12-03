import { getCardTemplate } from './card';
import { editCardTemplate } from './edit-card';
import { isFirst } from '../utils';

const getDate = (date) => {
  return new Intl.DateTimeFormat(`en-US`).format(date);
};


const createDayTemplate = (date, dayCards) => {
  const targetDate = new Date(date);
  const day = new Intl.DateTimeFormat(`en-US`, { day: `numeric` }).format(targetDate);
  const month = new Intl.DateTimeFormat(`en-US`, { month: `short` }).format(targetDate);
  const year = new Intl.DateTimeFormat(`en-US`, { year: `2-digit` }).format(targetDate);
  const eventsTemplate = dayCards.map((card) => getCardTemplate(card)).join(`\n`);

  return (
    `<li class="trip-days__item  day">
      <div class="day__info">
        <span class="day__counter">${day}</span>
        <time class="day__date" datetime="2019-03-18">${month} ${year}</time>
      </div>

      <ul class="trip-events__list">
        ${eventsTemplate}
      </ul>
     </li>`
  );
};

const createEditableDayTemplate = (date, dayCards) => {
  const targetDate = new Date(date);
  const day = new Intl.DateTimeFormat(`en-US`, { day: `numeric` }).format(targetDate);
  const month = new Intl.DateTimeFormat(`en-US`, { month: `short` }).format(targetDate);
  const year = new Intl.DateTimeFormat(`en-US`, { year: `2-digit` }).format(targetDate);
  const eventsTemplate = dayCards.map((card, index) => isFirst(index)
    ? editCardTemplate(card)
    : getCardTemplate(card))
    .join(`\n`);

  return (
    `<li class="trip-days__item  day">
      <div class="day__info">
        <span class="day__counter">${day}</span>
        <time class="day__date" datetime="2019-03-18">${month} ${year}</time>
      </div>

      <ul class="trip-events__list">
        ${eventsTemplate}
      </ul>
     </li>`
  );
};

const generateDaysTemplate = (days, cards) => days.map((day, index) => {
  const dayCards = cards.filter((card) => getDate(card.startTime) === day);
  return isFirst(index) ? createEditableDayTemplate(day, dayCards) : createDayTemplate(day, dayCards);
}).join(`\n`);

export const createDaysTemplate = (cards) => {
  const days = Array.from(new Set(cards.map((card) => getDate(card.startTime))));
  const daysMarkup = generateDaysTemplate(days, cards);

  return (
    `<ul class="trip-days">
      ${daysMarkup}
    </ul>`
  );
};

