import { flatten } from 'lodash';
import { getSpreadsheetRange, initGApi } from 'utils/googleApis';
import { TYPE_EXPENSE, TYPE_RECEIPT } from 'utils/businessConstants';

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
    range: `${sheetTitle}!A2:E`,
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
    range: `${sheetTitle}!M2:P`,
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
