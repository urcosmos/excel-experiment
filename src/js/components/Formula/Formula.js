import { ExcelComponent } from '../../core/ExcelComponent';

export default class Formula extends ExcelComponent {
  static classNames = ['excel__formula', 'formula'];

  constructor(root) {
    super(root, {
      name: 'Formula',
      listeners: ['input', 'click'],
    });
  }

  toHTML() {
    return `
      <div class="formula__info">fx</div>

          <div
            class="formula__input"
            contenteditable="true"
            spellcheck="false"
          ></div>
    `;
  }

  onInput(e) {
    console.log('Formula: onInput', e.target.textContent.trim());
  }

  onClick(e) {
    console.log(1);
  }
}
