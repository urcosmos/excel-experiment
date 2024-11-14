import './sass/index.sass';
import Router from './js/core/routes/Router';
import DashboardPage from './js/pages/DashboardPage';
import ExcelPage from './js/pages/ExcelPage';

new Router('#app', {
  dashboard: DashboardPage,
  excel: ExcelPage,
});
