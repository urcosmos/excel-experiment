import { J } from '../../core/DOM';
import { ExcelComponent } from '../../core/ExcelComponent';

export default class Formula extends ExcelComponent {
  static classNames = ['excel__formula', 'formula'];

  constructor(root, options) {
    super(root, {
      name: 'Formula',
      listeners: ['input', 'keydown'],
      ...options,
    });
  }

  init() {
    super.init();

    this.formula = this.root.find('#formula');

    this.on('table:select', (cell) => {
      this.formula.text(cell.text());
    });

    this.on('table:input', (cell) => {
      this.formula.text(cell.text());
    });
  }

  toHTML() {
    return `
      <div class="formula__info">fx</div>

          <div
            id="formula"
            class="formula__input"
            contenteditable="true"
            spellcheck="false"
          ></div>
    `;
  }

  onInput(e) {
    this.emit('formula:input', J(e.target).text());
  }

  onKeydown(e) {
    const keys = ['Enter', 'Tab'];
    if (keys.includes(e.key)) {
      e.preventDefault();
      this.emit('formula:done');
    }
  }
}
