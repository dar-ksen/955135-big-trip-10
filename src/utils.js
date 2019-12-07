const getTwoDigitFormat = (value) => String(value).padStart(2, `0`);

const formatterOptionsTime = {
  hour12: false,
  hour: `2-digit`,
  minute: `2-digit`,
};

const TimeFormatter = new Intl.DateTimeFormat(`en-US`, formatterOptionsTime);

const formatTime = (date) => TimeFormatter.format(date);

const formatterOptionsDate = {
  day: `numeric`,
  month: `short`,
};

const DateFormatter = new Intl.DateTimeFormat(`en-US`, formatterOptionsDate);

const formatDate = (date) => DateFormatter.format(date);

const isFirst = (index) => index === 0;

const getFirst = (array) => array[0];

const getLast = (array) => array[array.length - 1];

const getDate = (date) => new Intl.DateTimeFormat(`en-US`).format(date);

const RenderPosition = {
  AFTER_BEGIN: `afterbegin`,
  BEFORE_END: `beforeend`,
  AFTER: `after`,
  BEFORE: `before`
};

const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstElementChild;
};

const renderComponent = (container, component, place) => {
  const element = component.getElement();
  switch (place) {
    case RenderPosition.AFTER_BEGIN:
      container.prepend(element);
      break;
    case RenderPosition.BEFORE_END:
      container.append(element);
      break;
    case RenderPosition.AFTER:
      container.after(element);
      break;
    case RenderPosition.BEFORE:
      container.before(element);
      break;
  }
};

export {
  getTwoDigitFormat,
  formatTime,
  formatDate,
  isFirst,
  getFirst,
  getLast,
  getDate,
  RenderPosition,
  createElement,
  renderComponent
};
