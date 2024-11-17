export default class Page {
  constructor(params) {
    this.params = params || Date.now().toString();
  }

  getRoot() {
    throw new Error('Method "getRoor" should be implemented');
  }

  afterRender() {}

  destroy() {}
}
