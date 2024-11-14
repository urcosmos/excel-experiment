import Page from '../core/Page';
import { J } from '../core/Dom';
import { createRecordTable } from './dashboard.functions';

export default class DashboardPage extends Page {
  getRoot() {
    const now = Date.now().toString();

    return J.create('div', 'db').html(`
        <div class="dashboard__header">
          <h1 class="dashboard__header-title">Excel Dashboard</h1>
        </div>
        <div class="dashboard__new">
          <div class="dashboard__container">
            <a href="#excel/${now}"
            class="dashboard__new-create">Новая<br />таблица</a>
          </div>
        </div>
        <div class="dashboard__table">
          <div class="dashboard__container">
            ${createRecordTable()}
          </div>
        </div>
    `);
  }
}
