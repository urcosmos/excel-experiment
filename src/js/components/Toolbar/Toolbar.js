import { ExcelComponent } from '../../core/ExcelComponent';

export default class Toolbar extends ExcelComponent {
  static classNames = ['excel__toolbar', 'toolbar'];

  constructor(root, options) {
    super(root, {
      name: 'Toolbar',
      listeners: ['click'],
      ...options,
    });
  }

  toHTML() {
    return `
      <div class="toolbar__button button">
            <span class="material-icons button__icon"> format_bold </span>
          </div>
          <div class="toolbar__button button">
            <span class="material-icons button__icon"> format_italic </span>
          </div>
          <div class="toolbar__button button">
            <span class="material-icons button__icon"> format_underline </span>
          </div>
          <div class="toolbar__button button">
            <span class="material-icons button__icon"> format_align_left </span>
          </div>
          <div class="toolbar__button button">
            <span class="material-icons button__icon">
              format_align_center
            </span>
          </div>
          <div class="toolbar__button button">
            <span class="material-icons button__icon">
              format_align_right
            </span>
          </div>
    `;
  }

  onClick(e) {
    console.log(e.target);
  }
}
