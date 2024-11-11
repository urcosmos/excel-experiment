import { defaultTitle } from '../../constants';
import { J } from '../../core/Dom';
import { ExcelComponent } from '../../core/ExcelComponent';
import { debounce } from '../../core/utils';
import * as actions from '../../redux/actions';

export default class Header extends ExcelComponent {
  static classNames = ['excel__header', 'header'];

  constructor(root, options) {
    super(root, {
      name: 'Header',
      listeners: ['input'],
      ...options,
    });
  }

  prepare() {
    this.onInput = debounce(this.onInput, 300);
  }

  onInput(e) {
    const target = J(e.target);
    this.dispatch(actions.changeTitle(target.text()));
  }

  toHTML() {
    const title = this.store.getState().title || defaultTitle;
    return `
      <input
            type="text"
            class="input header__input"
            value="${title}"
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
