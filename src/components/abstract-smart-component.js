import AbstractComponent from './abstract-component';

class AbstractSmartComponent extends AbstractComponent {
  recoveryListeners() {
    throw new Error(`Abstract method not implemented: recoveryListeners`);
  }

  reRender() {
    const oldElement = this.getElement();
    const parent = oldElement.parentElement;
    this.removeElement();

    const newElement = this.getElement();
    parent.replaceChild(newElement, oldElement);

    this.recoveryListeners();
  }

}

export { AbstractSmartComponent as default };
