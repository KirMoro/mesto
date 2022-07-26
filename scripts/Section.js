export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._itemsArray = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  addItem(cardElement) {
    this._container.prepend(cardElement);
  }

  renderItems() {
    this._itemsArray.forEach((item) => {
      this._renderer(item);
    });
  }
}
