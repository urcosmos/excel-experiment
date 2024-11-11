import ExcelStateComponent from '../../core/ExcelStateComponent';
import { createToolbar } from './toolbar.template';
import { J } from '../../core/Dom';
import { defaultStyles } from '../../constants';

export default class Toolbar extends ExcelStateComponent {
  static classNames = ['excel__toolbar', 'toolbar'];

  constructor(root, options) {
    super(root, {
      name: 'Toolbar',
      listeners: ['click'],
      subscribe: ['currentStyles'],
      ...options,
    });
  }

  prepare() {
    this.initState(defaultStyles);
  }

  get template() {
    return createToolbar(this.state);
  }

  toHTML() {
    return this.template;
  }

  storeChanged(changes) {
    this.setState(changes.currentStyles);
  }

  onClick(e) {
    const target = J(e.target);
    if (target.data.type === 'button') {
      const value = JSON.parse(target.data.value);
      this.emit('toolbar:applyStyle', value);
    }
  }
}
