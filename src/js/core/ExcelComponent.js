import { DomListener } from './DomListener';

export class ExcelComponent extends DomListener {
  constructor(root, options = {}) {
    super(root, options.listeners);
    this.name = options.name || '';
    this.emitter = options.emitter;
    this.unsubs = [];

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

  prepare() {}

  init() {
    this.initDomListeners();
  }

  destroy() {
    this.removeDomListeners();
    this.unsubs.forEach((unsub) => unsub());
  }
}
