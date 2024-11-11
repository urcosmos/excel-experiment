import { DomListener } from './DomListener';

export class ExcelComponent extends DomListener {
  constructor(root, options = {}) {
    super(root, options.listeners);
    this.name = options.name || '';
    this.emitter = options.emitter;
    this.store = options.store;
    this.subscribe = options.subscribe || [];
    this.unsubs = [];
    this.storeSub = null;

    this.prepare();
  }

  toHTML() {
    return ``;
  }

  emit(e, ...args) {
    this.emitter.emit(e, ...args);
  }

  on(e, fn) {
    const unsub = this.emitter.subscribe(e, fn);
    this.unsubs.push(unsub);
  }

  dispatch(action) {
    this.store.dispatch(action);
  }

  // subscribe(fn) {
  //   this.storeSub = this.store.subscribe(fn);
  // }

  storeChanged() {}

  isWatching(key) {
    return this.subscribe.includes(key);
  }

  prepare() {}

  init() {
    this.initDomListeners();
  }

  destroy() {
    this.removeDomListeners();
    this.unsubs.forEach((unsub) => unsub());
    this.storeSub.unsubscribe();
  }
}
