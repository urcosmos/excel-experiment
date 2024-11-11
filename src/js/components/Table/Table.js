import { ExcelComponent } from '../../core/ExcelComponent';
import { J } from '../../core/Dom';
import { createTable } from './table.template';
import { resizeHandler } from './table.resize';
import { shouldResize } from './table.functions';
import { isCell } from './table.functions';
import { matrix } from './table.functions';
import { nextSelector } from './table.functions';
import TableSelection from './TableSelection';
import * as actions from '../../redux/actions';
import { defaultStyles } from '../../constants';
import { parse } from '../../core/parse';

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
    return createTable(20, this.store.getState());
  }

  prepare() {
    this.selection = new TableSelection();
  }

  init() {
    super.init();

    this.selectCell(this.root.find('[data-id="0:0"]'));

    this.on('formula:input', (value) => {
      this.selection.current.attr('data-value', value);
      this.selection.current.text(parse(value));
      this.updateTextInStore(value);
    });

    this.on('formula:done', () => {
      this.selection.current.focus();
    });

    this.on('toolbar:applyStyle', (value) => {
      this.selection.applyStyle(value);
      this.dispatch(
        actions.applyStyle({ value, ids: this.selection.selectedIds })
      );
    });
  }

  selectCell(cell) {
    this.selection.select(cell);
    this.emit('table:select', cell);
    const styles = cell.getStyles(Object.keys(defaultStyles));
    this.dispatch(actions.changeStyles(styles));
  }

  async resizeTable(e) {
    try {
      const data = await resizeHandler(this.root, e);
      this.dispatch(actions.tableResize(data));
    } catch (e) {
      console.wran(e.message);
    }
  }

  onMousedown(e) {
    if (shouldResize(e)) {
      this.resizeTable(e);
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

  updateTextInStore(value) {
    this.dispatch(
      actions.changeText({
        id: this.selection.current.id(),
        value,
      })
    );
  }

  onInput(e) {
    // this.emit('table:input', J(e.target));
    this.updateTextInStore(J(e.target).text());
  }
}
