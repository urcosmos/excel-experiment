import { J } from '../../core/DOM';

export class Excel {
  constructor(selector, options) {
    this.element = J(selector);
    this.components = options.components || [];
  }

  getRoot() {
    const root = J.create('div', 'excel');

    this.components = this.components.map((Component) => {
      const elem = J.create('div');
      Component.classNames.forEach((className) => {
        elem.elem.classList.add(className);
      });
      const component = new Component(elem);

      // // debug
      // if (component.name) {
      //   window['c' + component.name] = component;
      // }

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
}
