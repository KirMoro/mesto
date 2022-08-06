export default class Section {
  constructor({
    items,
    renderer
  }, containerSelector) {
    this._item = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  addItem(item) {
    this._container.prepend(item);
  }

  deleteItem(item) {
    item.remove();
  }

  renderItems() {
    this._item.forEach((item) => {
      this._renderer(item);
    });
  }
}
