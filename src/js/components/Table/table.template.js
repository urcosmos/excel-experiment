const CODES = {
  A: 65,
  Z: 90,
};

function createRow(rowNumber, content) {
  return `
    <div class="row table__row">
      <div class="row-address">${rowNumber}</div>
      <div class="row-data">${content}</div>
    </div>
  `;
}

function toChar(_, index) {
  return String.fromCharCode(CODES.A + index);
}

function toColumn(col) {
  return `
    <div class="column-address">${col}</div>
  `;
}

function toCell(content) {
  return `
    <div class="cell" contenteditable spellcheck="false">${content}</div>
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
