import { range } from '../../core/utils';

export function shouldResize(e) {
  return e.target.dataset.resize;
}

export function isCell(e) {
  return e.target.dataset.type === 'cell';
}

export function matrix(target, current) {
  const targetId = target.id(true);
  const currentId = current.id(true);

  const cols = range(currentId.col, targetId.col);
  const rows = range(currentId.row, targetId.row);

  const ids = cols.reduce((acc, col) => {
    rows.forEach((row) => {
      acc.push(`${row}:${col}`);
    });
    return acc;
  }, []);

  return ids;
}

export function nextSelector(key, { col, row }) {
  const MIN_VALUE = 0;

  switch (key) {
    case 'Enter':
    case 'ArrowDown':
      row++;
      break;

    case 'Tab':
    case 'ArrowRight':
      col++;
      break;

    case 'ArrowLeft':
      col = col - 1 < MIN_VALUE ? MIN_VALUE : col - 1;
      break;

    case 'ArrowUp':
      row = row - 1 < MIN_VALUE ? MIN_VALUE : row - 1;
      break;
  }

  return `[data-id="${row}:${col}"]`;
}
