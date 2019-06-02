import {
  SET_DRAWER_OPEN,
  COPY_SPREADSHEET_LINK,
  GO_TO_SPREADSHEET,
} from './constants';

export function setDrawerOpen(open) {
  return {
    type: SET_DRAWER_OPEN,
    open,
  };
}

export function copySpreadsheetLink(link) {
  return {
    type: COPY_SPREADSHEET_LINK,
    link,
  };
}

export function goToSpreadsheet(link) {
  return {
    type: GO_TO_SPREADSHEET,
    link,
  };
}
