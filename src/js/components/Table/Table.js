import { ExcelComponent } from '../../core/ExcelComponent';
import { createTable } from './table.template';
import { resizeHandler } from './table.resize';
import { shouldResize } from './table.functions';

export default class Table extends ExcelComponent {
  static classNames = ['excel__table', 'table'];

  constructor(root) {
    super(root, {
      listeners: ['mousedown', 'mousemove', 'mouseup'],
    });
  }

  toHTML() {
    return createTable();
  }

  onMousedown(e) {
    if (shouldResize(e)) {
      resizeHandler(this.root, e);
    }
  }

  onMousemove(e) {}

  onMouseup(e) {}
}
