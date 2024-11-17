import Page from '../core/Page';
import { Excel } from '../components/excel/excel';
import Header from '../components/Header/Header';
import Toolbar from '../components/Toolbar/Toolbar';
import Formula from '../components/Formula/Formula';
import Table from '../components/Table/Table';
import { rootReducer } from '../redux/rootReducer';
import Store from '../core/store/Store';
import { normalizeInitialState } from '../redux/initialState';
import StateProcessor from '../core/StateProcessor';
import LocalStorageClient from '../core/clients/LoacalStorage';

export default class ExcelPage extends Page {
  constructor(param) {
    super(param);

    this.storeSub = null;
    this.processor = new StateProcessor(new LocalStorageClient(this.params));
  }

  async getRoot() {
    const state = await this.processor.get();
    const store = new Store(rootReducer, normalizeInitialState(state));

    this.storeSub = store.subscribe(this.processor.listen);

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
    this.storeSub.unsubscribe();
  }
}
