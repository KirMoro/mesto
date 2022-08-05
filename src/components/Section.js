export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._item = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  addItem(cardElement) {
    this._container.prepend(cardElement);
  }

  deleteItem(cardElement) {
    cardElement.remove();
  }

  renderItems() {
    this._item.forEach((item) => {
      this._renderer(item);
    });
  }
}
