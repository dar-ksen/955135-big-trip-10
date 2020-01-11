import { FilterType } from '../const';
import FilterComponent from '../components/filter';
import { renderComponent, replaceComponent, RenderPosition } from '../utils/render';

class FilterController {
  constructor(container, pointModel) {
    this._container = container;
    this._pointModel = pointModel;

    this._activeFilterType = FilterType.EVERYTHING;
    this._filterComponent = null;

    this._onFilterChange = this._onFilterChange.bind(this);

  }

  render() {
    const container = this._container;
    const filters = Object.values(FilterType).map((filterType) => {
      return {
        name: filterType,
        checked: filterType === this._activeFilterType,
      };
    });

    const oldComponent = this._filterComponent;

    this._filterComponent = new FilterComponent(filters);
    this._filterComponent.setFilterChangeHandler(this._onFilterChange);

    if (oldComponent) {
      replaceComponent(this._filterComponent, oldComponent);
    } else {
      renderComponent(container, this._filterComponent, RenderPosition.AFTER);
    }
  }

  _onFilterChange(filterType) {
    this._pointModel.setFilter(filterType);
    this._activeFilterType = filterType;
  }
}

export { FilterController as default };
