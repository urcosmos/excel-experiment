const CODES = {
  A: 65,
  Z: 90,
};

function createRow(rowNumber, content) {
  const resize = rowNumber
    ? `<div class="row-resize" data-resize="row"></div>`
    : '';

  return `
    <div class="row table__row" data-type="resizable">
      <div class="row-address">
        ${rowNumber}
        ${resize}
      </div>
      <div class="row-data">${content}</div>
    </div>
  `;
}

function toChar(_, index) {
  return String.fromCharCode(CODES.A + index);
}

function toColumn(col, index) {
  return `
    <div class="column-address" data-type="resizable" data-col="${index}">
      ${col}
      <div class="col-resize" data-resize="col"></div>
    </div>
  `;
}

function toCell(_, col) {
  return `
    <div class="cell" contenteditable spellcheck="false" data-col="${col}">
    </div>
  `;
}

export function createTable(rowsCount = 15) {
  const colsCount = CODES.Z - CODES.A + 1;
  const rows = [];

  const cols = new Array(colsCount).fill('').map(toChar).map(toColumn).join('');

  rows.push(createRow('', cols));

  for (let i = 0; i < rowsCount; i++) {
    const cells = new Array(colsCount).fill('').map(toCell).join('');
    rows.push(createRow(i + 1, cells));
  }

  return rows.join('');
}
