import { getCardTemplate } from "./card";
import { editCardTemplate } from "./edit-card";

const getDate = (date) => {
  return new Intl.DateTimeFormat(`en-US`).format(date);
};

let isEdit;

const createDayTemplate = (date, dayCards) => {
  const targetDate = new Date(date);
  const day = new Intl.DateTimeFormat(`en-US`, { day: `numeric` }).format(targetDate);
  const month = new Intl.DateTimeFormat(`en-US`, { month: `short` }).format(targetDate);
  const year = new Intl.DateTimeFormat(`en-US`, { year: `2-digit` }).format(targetDate);
  let editTemplate = ``;
  let eventsTemplate = ``;
  if (isEdit) {
    editTemplate = editCardTemplate(dayCards[0]);
    eventsTemplate = dayCards.slice(1).map((card) => getCardTemplate(card)).join(`\n`);
    isEdit = false;
  } else {
    editTemplate = ``;
    eventsTemplate = dayCards.map((card) => getCardTemplate(card)).join(`\n`);
  }

  return (
    `<li class="trip-days__item  day">
      <div class="day__info">
        <span class="day__counter">${day}</span>
        <time class="day__date" datetime="2019-03-18">${month} ${year}</time>
      </div>

      <ul class="trip-events__list">
        ${editTemplate}
        ${eventsTemplate}
      </ul>
     </li>`
  );
};

const generateDaysTemplate = (days, cards) => {
  return Array.from(days).map((day) => {
    const dayCards = cards.filter((card) => getDate(card.startTime) === day);
    return createDayTemplate(day, dayCards);
  }).join(`\n`);
};

export const createDaysTemplate = (cards) => {
  isEdit = true;
  const days = new Set(cards.map((card) => getDate(card.startTime)));
  const daysMarkup = generateDaysTemplate(days, cards);

  return (
    `<ul class="trip-days">
      ${daysMarkup}
    </ul>`
  );
};

