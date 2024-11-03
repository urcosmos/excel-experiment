import { ExcelComponent } from '../../core/ExcelComponent';
import { J } from '../../core/DOM';
import { createTable } from './table.template';
import { resizeHandler } from './table.resize';
import { shouldResize } from './table.functions';
import { isCell } from './table.functions';
import { matrix } from './table.functions';
import { nextSelector } from './table.functions';
import TableSelection from './TableSelection';

export default class Table extends ExcelComponent {
  static classNames = ['excel__table', 'table'];

  constructor(root, options) {
    super(root, {
      name: 'Table',
      listeners: ['mousedown', 'keydown', 'input'],
      ...options,
    });
  }

  toHTML() {
    return createTable();
  }

  prepare() {
    this.selection = new TableSelection();
  }

  init() {
    super.init();

    this.selectCell(this.root.find('[data-id="0:0"]'));

    this.on('formula:input', (text) => {
      this.selection.current.text(text);
    });

    this.on('formula:done', () => {
      this.selection.current.focus();
    });
  }

  selectCell(cell) {
    this.selection.select(cell);
    this.emit('table:select', cell);
  }

  onMousedown(e) {
    if (shouldResize(e)) {
      resizeHandler(this.root, e);
    }

    if (isCell(e)) {
      const target = J(e.target);

      if (e.shiftKey) {
        const cells = matrix(target, this.selection.current).map((id) => {
          return this.root.find(`[data-id="${id}"]`);
        });

        this.selection.selectGroup(cells);
      } else {
        this.selectCell(target);
      }
    }
  }

  onKeydown(e) {
    const keys = [
      'Enter',
      'Tab',
      'ArrowUp',
      'ArrowRight',
      'ArrowDown',
      'ArrowLeft',
    ];

    const { key } = e;

    if (keys.includes(key) && !e.shiftKey) {
      e.preventDefault();
      const id = this.selection.current.id(true);
      const next = this.root.find(nextSelector(key, id));
      this.selectCell(next);
    }
  }

  onInput(e) {
    this.emit('table:input', J(e.target));
  }
}
