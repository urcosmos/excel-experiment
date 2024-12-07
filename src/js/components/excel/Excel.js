import { J } from '../../core/Dom';
import Emitter from '../../core/Emitter';
import { StoreSubscriber } from '../../core/StoreSubscriber';
import { updateDate } from '../../redux/actions';
import { preventDefault } from '../../core/utils';

export class Excel {
  constructor(options) {
    this.components = options.components || [];
    this.store = options.store;
    this.subscriber = new StoreSubscriber(this.store);
    this.emitter = new Emitter();
  }

  getRoot() {
    const root = J.create('div', 'excel');

    const componentOptions = {
      emitter: this.emitter,
      store: this.store,
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

  init() {
    if (process.env.NODE_ENV === 'production') {
      document.addEventListener('contextmenu', preventDefault);
    }
    this.store.dispatch(updateDate());
    this.subscriber.subscribeComponents(this.components);
    this.components.forEach((component) => {
      component.init();
    });
  }

  destroy() {
    this.subscriber.unsubscribeFromStore();
    this.components.forEach((component) => {
      component.destroy();
    });
    document.removeEventListener('contextmenu', preventDefault);
  }
}
