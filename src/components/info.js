const monthNames = {
  0: `JUN`,
  1: `FEB`,
  2: `MAR`,
  3: `APR`,
  4: `MAY`,
  5: `JUN`,
  6: `JUL`,
  7: `AUG`,
  8: `SEP`,
  9: `OCT`,
  10: `NOV`,
  11: `DEC`
};

const getCitiesMarkup = (cards) => {
  const cities = cards.map(({ city }) => city);
  if (cities.length > 3) {
    return `${cities[0]} &mdash; ... &mdash; ${cities[cities.length - 1]}`;
  }
  return cities.map((city, i) => i ? `&mdash; ${city}` : `${city}`).join(`\n`);
};

export const getInfoElement = (cards) => {
  const citiesMarkup = getCitiesMarkup(cards);
  return (`
  <div class="trip-info__main">
    <h1 class="trip-info__title">${citiesMarkup}</h1>

    <p class="trip-info__dates">
    ${monthNames[(cards[0].startTime).getMonth()]} ${cards[0].startTime.getDate()}
    &nbsp;&mdash;&nbsp;
    ${monthNames[(cards[cards.length - 1].endTime).getMonth()]} ${cards[cards.length - 1].endTime.getDate()}
    </p>
  </div>
  `);
};
