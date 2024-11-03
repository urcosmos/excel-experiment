import { J } from '../../core/DOM';
import Emitter from '../../core/Emitter';

export class Excel {
  constructor(selector, options) {
    this.element = J(selector);
    this.components = options.components || [];
    this.emitter = new Emitter();
  }

  getRoot() {
    const root = J.create('div', 'excel');

    const componentOptions = {
      emitter: this.emitter,
    };

    this.components = this.components.map((Component) => {
      const elem = J.create('div');
      Component.classNames.forEach((className) => {
        elem.elem.classList.add(className);
      });
      const component = new Component(elem, componentOptions);

      elem.html(component.toHTML());
      root.append(elem);
      return component;
    });

    return root;
  }

  render() {
    this.element.append(this.getRoot());

    this.components.forEach((component) => {
      component.init();
    });
  }

  destroy() {
    this.components.forEach((component) => {
      component.destroy();
    });
  }
}
