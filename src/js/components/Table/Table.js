import { ExcelComponent } from '../../core/ExcelComponent';
import { createTable } from './table.template';

export default class Table extends ExcelComponent {
  static classNames = ['excel__table', 'table'];

  toHTML() {
    return createTable();
  }
}
