import * as types from './types';

function tableResize(data) {
  return {
    type: types.TABLE_RESIZE,
    data,
  };
}

function changeText(data) {
  return {
    type: types.CHANGE_TEXT,
    data,
  };
}

function changeStyles(data) {
  return {
    type: types.CHANGE_STYLES,
    data,
  };
}

function applyStyle(data) {
  return {
    type: types.APPLY_STYLE,
    data,
  };
}

function changeTitle(data) {
  return {
    type: types.CHANGE_TIILE,
    data,
  };
}

function updateDate() {
  return {
    type: types.UPDATE_DATE,
  };
}

export {
  tableResize,
  changeText,
  changeStyles,
  applyStyle,
  changeTitle,
  updateDate,
};
