import { storage } from '../core/utils';

function toHTML(key) {
  const model = storage(key);
  const id = key.split(':')[1];
  return `
    <li class="dashboard__record">
      <a href="#excel/${id}" class="dashboard__record-link">${model.title}</a>
      <span class="dashboard__record-opendate">
        ${new Date(model.openedDate).toLocaleDateString()}
        ${new Date(model.openedDate).toLocaleTimeString()}
      </span>
    </li>
  `;
}

function getAllKeys() {
  const keys = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (!key.includes('excel')) {
      continue;
    }
    keys.push(key);
  }
  return keys;
}

export function createRecordTable() {
  const keys = getAllKeys();

  if (!keys.length) {
    return `<p>Нет активных таблиц</p>`;
  }

  return `
    <div class="dashboard__list-header">
      <span class="dashboard__column-name">Название</span>
      <span class="dashboard__column-name">Дата открытия</span>
    </div>
    <ul class="dashboard__list">
      ${keys.map(toHTML).join('')}
    </ul>
  `;
}
