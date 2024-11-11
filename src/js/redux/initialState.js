import { storage } from '../core/utils';
import { defaultStyles, defaultTitle } from '../constants';

const defaultState = {
  colState: {},
  rowState: {},
  dataState: {},
  stylesState: {},
  currentText: '',
  currentStyles: defaultStyles,
  title: defaultTitle,
};

const normalize = (state) => {
  return {
    ...state,
    currentStyles: defaultStyles,
    currentText: '',
  };
};

export const initialState = storage('excel-state')
  ? normalize(storage('excel-state'))
  : defaultState;