export default class TableSelection {
  static className = 'selected';

  constructor() {
    this.group = [];
    this.current = null;
  }

  select(elem) {
    this.clear();

    this.group.push(elem);
    this.current = elem;
    elem.focus().addClass(TableSelection.className);
  }

  clear() {
    this.group.forEach((elem) => {
      elem.removeClass(TableSelection.className);
    });

    this.group = [];
  }

  selectGroup(group = []) {
    this.clear();

    this.group = group;
    this.group.forEach((elem) => {
      elem.addClass(TableSelection.className);
    });
  }
}
