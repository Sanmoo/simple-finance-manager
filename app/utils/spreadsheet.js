import { flatten } from 'lodash';
import { getSpreadsheetRange, initGApi } from 'utils/googleApis';
import { TYPE_EXPENSE, TYPE_RECEIPT } from 'utils/businessConstants';
import format from 'date-fns/format';

const EXPENSE_ENTRIES_RANGE = 'A2:E';
const RECEIPT_ENTRIES_RANGE = 'M2:P';
const SPREADSHEET_DATE_FORMAT = 'dd/MM/yyyy';

export async function collectCategoryGoalsFromSpreadsheet(
  spreadsheetId,
  sheetTitle,
) {
  await initGApi();

  return flatten(
    await Promise.all([
      collectExpenseCGoalsFromSheet(spreadsheetId, sheetTitle),
      collectReceiptCGoalsFromSheet(spreadsheetId, sheetTitle),
    ]),
  );
}

export async function collectEntriesFromSpreadsheet(spreadsheetId, sheetTitle) {
  await initGApi();

  return flatten(
    await Promise.all([
      collectExpensesFromSpreadsheet(spreadsheetId, sheetTitle),
      collectReceiptsFromSpreadsheet(spreadsheetId, sheetTitle),
    ]),
  );
}

export async function collectExpenseCGoalsFromSheet(spreadsheetId, sheetTitle) {
  return (await getSpreadsheetRange({
    spreadsheetId,
    range: `${sheetTitle}!G2:H`,
  })).values.map(([name, value]) => ({
    name,
    value,
    type: TYPE_EXPENSE,
    originSheetTitle: sheetTitle,
  }));
}

export async function collectExpensesFromSpreadsheet(
  spreadsheetId,
  sheetTitle,
) {
  return (await getSpreadsheetRange({
    spreadsheetId,
    range: `${sheetTitle}!${EXPENSE_ENTRIES_RANGE}`,
  })).values.map(([date, desc, isCredit, category, value], index) => ({
    line: index,
    date,
    desc,
    isCredit,
    category,
    value,
    originSheetTitle: sheetTitle,
    type: TYPE_EXPENSE,
  }));
}

export async function collectReceiptCGoalsFromSheet(spreadsheetId, sheetTitle) {
  return (await getSpreadsheetRange({
    spreadsheetId,
    range: `${sheetTitle}!R2:S`,
  })).values.map(([name, value]) => ({
    name,
    value,
    type: TYPE_RECEIPT,
    originSheetTitle: sheetTitle,
  }));
}

export async function collectReceiptsFromSpreadsheet(
  spreadsheetId,
  sheetTitle,
) {
  return (await getSpreadsheetRange({
    spreadsheetId,
    range: `${sheetTitle}!${RECEIPT_ENTRIES_RANGE}`,
  })).values.map(([date, desc, category, value], index) => ({
    line: index,
    date,
    desc,
    category,
    value,
    isCredit: false,
    originSheetTitle: sheetTitle,
    type: TYPE_RECEIPT,
  }));
}

export async function addNewEntry(values) {
  await initGApi();

  const {
    type,
    date,
    description,
    credit,
    value,
    category,
    spreadsheetId,
  } = values;
  const requestParams = {
    spreadsheetId,
    range:
      type === TYPE_EXPENSE ? EXPENSE_ENTRIES_RANGE : RECEIPT_ENTRIES_RANGE,
    insertDataOption: 'OVERWRITE',
    valueInputOption: 'RAW',
  };
  const requestBody = {
    majorDimension: 'ROWS',
    values: [
      [
        format(date, SPREADSHEET_DATE_FORMAT),
        description,
        credit ? 'y' : 'n',
        category,
        value,
      ],
    ],
  };

  await gapi.client.sheets.spreadsheets.values.append(
    requestParams,
    requestBody,
  );
}
