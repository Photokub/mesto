export default class Section {
    constructor({item, renderer}, containerSelector) {
      this._initialArray = item;
      this._renderer = renderer;
      this._container = containerSelector;
    }
  
    addItem(element) {
      this._container.prepend(element)
    }
  
    renderItems() {
      this._initialArray.forEach(item => {
        this._renderer(item);
      })
    }
  }