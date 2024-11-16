import Page from '../core/Page';
import { Excel } from '../components/excel/excel';
import Header from '../components/Header/Header';
import Toolbar from '../components/Toolbar/Toolbar';
import Formula from '../components/Formula/Formula';
import Table from '../components/Table/Table';
import { rootReducer } from '../redux/rootReducer';
import Store from '../core/store/Store';
import { storage, debounce } from '../core/utils';
import { normalizeInitialState } from '../redux/initialState';

function storageName(param) {
  return `excel:` + param;
}

export default class ExcelPage extends Page {
  getRoot() {
    const params = this.params ? this.params : Date.now().toString();

    const state = storage(storageName(params));
    const store = new Store(rootReducer, normalizeInitialState(state));

    const stateListener = debounce((state) => {
      storage(storageName(params), state);
    }, 1000);

    store.subscribe(stateListener);

    this.excel = new Excel({
      components: [Header, Toolbar, Formula, Table],
      store,
    });

    return this.excel.getRoot();
  }

  afterRender() {
    this.excel.init();
  }

  destroy() {
    this.excel.destroy();
  }
}
