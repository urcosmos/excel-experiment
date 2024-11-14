import { defaultTitle } from '../../constants';
import { J } from '../../core/Dom';
import { ExcelComponent } from '../../core/ExcelComponent';
import ActiveRoute from '../../core/routes/ActiveRoute';
import { debounce } from '../../core/utils';
import * as actions from '../../redux/actions';

export default class Header extends ExcelComponent {
  static classNames = ['excel__header', 'header'];

  constructor(root, options) {
    super(root, {
      name: 'Header',
      listeners: ['input', 'click'],
      ...options,
    });
  }

  prepare() {
    this.onInput = debounce(this.onInput, 300);
  }

  onClick(e) {
    const target = J(e.target);

    if (target.data.button === 'deleteTable') {
      const decision = confirm('Вы хотите удалить эту таблицу?');
      if (decision) {
        localStorage.removeItem('excel:' + ActiveRoute.param);
        ActiveRoute.navigate('');
      }
    } else if (target.data.button === 'logoutTable') {
      ActiveRoute.navigate('');
    }
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
            <div class="header__button button" data-button="deleteTable">
              <span
                class="material-icons button__icon"
                data-button="deleteTable"> delete_outline
              </span>
            </div>
            <div class="header__button button button--rect"
              data-button="logoutTable">
              <span
                class="material-icons button__icon"
                data-button="logoutTable"> logout
              </span>
            </div>
          </div>
    `;
  }
}
