import { ExcelComponent } from '../../core/ExcelComponent';

export default class Header extends ExcelComponent {
  static classNames = ['excel__header', 'header'];

  toHTML() {
    return `
      <input
            type="text"
            class="input header__input"
            value="Новая таблица"
          />
          <div class="header__buttons-group">
            <div class="header__button button">
              <span class="material-icons button__icon"> delete_outline </span>
            </div>
            <div class="header__button button button--rect">
              <span class="material-icons button__icon"> logout </span>
            </div>
          </div>
    `;
  }
}
