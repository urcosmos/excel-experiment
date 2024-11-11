import './sass/index.sass';
import { Excel } from './js/components/excel/excel';
import Header from './js/components/Header/Header';
import Toolbar from './js/components/Toolbar/Toolbar';
import Formula from './js/components/Formula/Formula';
import Table from './js/components/Table/Table';
// import { createStore } from './js/core/createStore';
import { rootReducer } from './js/redux/rootReducer';
import Store from './js/redux/Store';
import { storage, debounce } from './js/core/utils';
import { initialState } from './js/redux/initialState';

const store = new Store(rootReducer, initialState);

const stateListener = debounce((state) => {
  console.log('app state: ', state);
  storage('excel-state', state);
}, 1000);

store.subscribe(stateListener);

const excel = new Excel('#app', {
  components: [Header, Toolbar, Formula, Table],
  store,
});

excel.render();
