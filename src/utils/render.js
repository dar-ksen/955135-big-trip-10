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

const replaceComponent = (newComponent, oldComponent) => {
  const parentElement = oldComponent.getElement().parentElement;
  const newElement = newComponent.getElement();
  const oldElement = oldComponent.getElement();

  const areElementsAvailable = Boolean(parentElement && newElement && oldElement);

  if (areElementsAvailable && parentElement.contains(oldElement)) {
    parentElement.replaceChild(newElement, oldElement);
  }
};

const removeComponent = (component) => {
  component.getElement().remove();
  component.removeElement();
};

const renderComponent = (container, component, place = RenderPosition.BEFORE_END) => {
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
  replaceComponent,
  removeComponent,
  renderComponent
};
