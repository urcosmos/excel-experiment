import './sass/index.sass';
import { Excel } from './js/components/excel/excel';
import Header from './js/components/Header/Header';
import Toolbar from './js/components/Toolbar/Toolbar';
import Formula from './js/components/Formula/Formula';
import Table from './js/components/Table/Table';

const excel = new Excel('#app', {
  components: [Header, Toolbar, Formula, Table],
});

excel.render();
