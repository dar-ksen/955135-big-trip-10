import { getCardTemplate } from "./card";
import { editCardTemplate } from "./edit-card";

import { isFirst } from '../utils';

export const sortCardTemplate = (cards) => {
  const cardtListTemlate = cards.map((card, index) => isFirst(index)
    ? editCardTemplate(card)
    : getCardTemplate(card)
  ).join(`\n`);

  return (`
  <li class="trip-days__item  day">
    <div class="day__info">
    </div>

    <ul class="trip-events__list">
      ${cardtListTemlate}
    </ul>
 </li>`
  );
};
