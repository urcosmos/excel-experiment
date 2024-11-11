import { J } from '../../core/Dom';
import { ExcelComponent } from '../../core/ExcelComponent';

export default class Formula extends ExcelComponent {
  static classNames = ['excel__formula', 'formula'];

  constructor(root, options) {
    super(root, {
      name: 'Formula',
      listeners: ['input', 'keydown'],
      subscribe: ['currentText'],
      ...options,
    });
  }

  init() {
    super.init();

    this.formula = this.root.find('#formula');

    this.on('table:select', (cell) => {
      this.formula.text(cell.data.value);
    });

    // this.on('table:input', (cell) => {
    //   this.formula.text(cell.text());
    // });

    // this.subscribe((state) => {
    //   console.log('Formula update', state);
    //   this.formula.text(state.currentText);
    // });
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

  storeChanged({ currentText }) {
    this.formula.text(currentText);
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
