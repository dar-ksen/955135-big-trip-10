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
  RenderPosition,
  createElement,
  renderComponent
};
