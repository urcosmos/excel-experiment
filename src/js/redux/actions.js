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

export { tableResize, changeText, changeStyles, applyStyle, changeTitle };
