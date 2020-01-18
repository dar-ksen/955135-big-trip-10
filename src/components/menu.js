import AbstractComponent from './abstract-component';
import { upperFirstCharacter } from '../utils/common';

const ACTIVE_MENU_CLASS = `trip-tabs__btn--active`;

const MenuItem = {
  TABLE: `table`,
  STATS: `stats`
};

const menuItems = [
  {
    name: MenuItem.TABLE,
    active: true
  },
  {
    name: MenuItem.STATS,
    active: false
  }
];

const getMenuItemsTemplate = () => menuItems
  .map((item) => `<a class="trip-tabs__btn js-trip-tabs__btn ${
    item.active ? ACTIVE_MENU_CLASS : ``
  }" href="#" id="${item.name}">${upperFirstCharacter(item.name)}</a>`
  ).join(``);

const getMenuTemplate = () => {
  const menuItemsTemplate = getMenuItemsTemplate();
  return (`
  <nav class="trip-controls__trip-tabs  trip-tabs">
    ${menuItemsTemplate}
  </nav>
  `);
};

class Menu extends AbstractComponent {
  getTemplate() {
    return getMenuTemplate(this);
  }

  setActiveItem(selectedItem) {
    this.getElement()
      .querySelectorAll(`.js-trip-tabs__btn`)
      .forEach((item) => {
        if (item.id === selectedItem) {
          item.classList.add(ACTIVE_MENU_CLASS);
        } else {
          item.classList.remove(ACTIVE_MENU_CLASS);
        }
      });
  }

  setChangeHandler(handler) {
    this.getElement().addEventListener(`click`, (evt) => {
      if (evt.target.tagName !== `A`) {
        return;
      }
      evt.preventDefault();

      const menuItem = evt.target.id;

      handler(menuItem);
    });
  }

}

export {
  Menu as default,
  MenuItem
};
