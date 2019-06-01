import {
  getSpreadsheetRanges,
  initGApi,
  createBlankSpreadsheet,
  deleteSheet,
  getAvailableSheetTitles,
  copySheet,
  updateSheetTitle,
  fetchSheetIdByTitle,
  clearSheetCellRanges,
} from 'utils/googleApis';
import { TYPE_EXPENSE, TYPE_INCOME } from 'utils/businessConstants';
import { ERROR_SHEET_NOT_FOUND } from 'utils/constants';

import format from 'date-fns/format';

const EXPENSE_ENTRIES_RANGE = 'A2:E';
const INCOME_ENTRIES_RANGE = 'M2:P';
const EXPENSE_CATEGORIES_RANGE = 'G2:H';
const INCOME_CATEGORIES_RANGE = 'R2:S';
const SPREADSHEET_DATE_FORMAT = 'dd/MM/yyyy';

// Example: 'Mai-2019'!A9:E9
const UPDATED_RANGE_REGEX = /'[^']*'![^\d]+(\d+):[^\d]+(\d+)/i;

const createExpenseEntryFromSsRow = (
  [date, desc, credit, category, value],
  index,
) => ({
  line: index + 2,
  date,
  desc,
  credit,
  category,
  value,
  type: TYPE_EXPENSE,
});

const createIncomeEntryFromSsRow = ([date, desc, category, value], index) => ({
  line: index + 2,
  date,
  desc,
  category,
  value,
  credit: false,
  type: TYPE_INCOME,
});

const createCategoryGoalFromSsRow = type => ([name, value], index) => ({
  line: index + 2,
  name,
  value,
  type,
});

/**
 * Executes a bashGet against the given spreadsheetId and sheetTitle
 * And returns all interesting data from it: entries and category goals,
 * income and expense types
 */
export async function collectSpreadsheetData(spreadsheetId, sheetTitle) {
  await initGApi();

  let valueRanges;

  try {
    ({ valueRanges } = await getSpreadsheetRanges({
      spreadsheetId,
      ranges: [
        `${sheetTitle}!${EXPENSE_ENTRIES_RANGE}`,
        `${sheetTitle}!${INCOME_ENTRIES_RANGE}`,
        `${sheetTitle}!${EXPENSE_CATEGORIES_RANGE}`,
        `${sheetTitle}!${INCOME_CATEGORIES_RANGE}`,
      ],
    }));
  } catch (e) {
    if (e && e.result && e.result.error) {
      const { code, status } = e.result.error;
      if (code === 400 && status === 'INVALID_ARGUMENT') {
        const craftedError = { type: ERROR_SHEET_NOT_FOUND, object: e };
        throw craftedError;
      }
    }
    throw e;
  }

  const [
    expenseEntries = [],
    incomeEntries = [],
    categoriesExpense,
    categoriesIncome,
  ] = valueRanges.map(vR => vR.values);

  const entries = expenseEntries
    .map(createExpenseEntryFromSsRow)
    .concat(incomeEntries.map(createIncomeEntryFromSsRow));

  entries.forEach(e => {
    e.originSheetTitle = sheetTitle;
  });

  const categoryGoals = categoriesExpense
    .map(createCategoryGoalFromSsRow(TYPE_EXPENSE))
    .concat(categoriesIncome.map(createCategoryGoalFromSsRow(TYPE_INCOME)));

  categoryGoals.forEach(c => {
    c.originSheetTitle = sheetTitle; // eslint-disable-line no-param-reassign
  });

  return { entries, categoryGoals };
}

export async function addNewEntry(sheetTitle, values) {
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
    range: `'${sheetTitle}'!${
      type === TYPE_EXPENSE ? EXPENSE_ENTRIES_RANGE : INCOME_ENTRIES_RANGE
    }`,
    insertDataOption: 'OVERWRITE',
    valueInputOption: 'RAW',
  };

  const requestBody = {
    majorDimension: 'ROWS',
    values: [
      [
        format(date, SPREADSHEET_DATE_FORMAT),
        description,
        ...(type === TYPE_EXPENSE ? [credit ? 'y' : 'n'] : []),
        category,
        value,
      ],
    ],
  };

  const {
    result: { updates },
  } = await gapi.client.sheets.spreadsheets.values.append(
    requestParams,
    requestBody,
  );

  const [, lineStartStr, lineEndStr] = UPDATED_RANGE_REGEX.exec(
    updates.updatedRange,
  );
  const lineStart = parseInt(lineStartStr, 10);
  const lineEnd = parseInt(lineEndStr, 10);

  if (lineStart !== lineEnd) {
    throw new Error('Assert false');
  }

  return lineStart;
}

export async function editEntry(sheetTitle, values) {
  await initGApi();

  const {
    type,
    date,
    description,
    credit,
    value,
    category,
    spreadsheetId,
    line,
  } = values;
  const requestParams = {
    spreadsheetId,
    range: `'${sheetTitle}'!${
      type === TYPE_EXPENSE ? `A${line}:E${line}` : `M${line}:E${line}`
    }`,
    valueInputOption: 'RAW',
  };
  const requestBody = {
    majorDimension: 'ROWS',
    values: [
      [
        format(date, SPREADSHEET_DATE_FORMAT),
        description,
        ...(type === TYPE_EXPENSE ? [credit ? 'y' : 'n'] : []),
        category,
        value,
      ],
    ],
  };

  await gapi.client.sheets.spreadsheets.values.update(
    requestParams,
    requestBody,
  );
}

export async function verifySheetExistence(spreadsheetId, sheetTitle) {
  await initGApi();
  const availableSheetTitles = await getAvailableSheetTitles({ spreadsheetId });
  return availableSheetTitles.includes(sheetTitle);
}

export async function copySheetWithANewName({
  originSpreadsheetId,
  originSheetId,
  originSheetName,
  targetSpreadsheetId,
  targetSheetTitle,
}) {
  await initGApi();

  let sheetId = originSheetId;
  if (!sheetId && originSheetName) {
    sheetId = await fetchSheetIdByTitle({
      spreadsheetId: originSpreadsheetId,
      sheetTitle: originSheetName,
    });
  }

  const newSheetId = await copySheet({
    originSpreadsheetId,
    originSheetId: sheetId,
    targetSpreadsheetId,
  });

  await updateSheetTitle({
    spreadsheetId: targetSpreadsheetId,
    sheetId: newSheetId,
    title: targetSheetTitle,
  });

  return newSheetId;
}

export async function createNewSpreadsheet(title) {
  await initGApi();
  return createBlankSpreadsheet(title);
}

export async function cleanAllEntries({ spreadsheetId, sheetTitle }) {
  await initGApi();

  await clearSheetCellRanges({
    spreadsheetId,
    ranges: [
      `${sheetTitle}!${EXPENSE_ENTRIES_RANGE}`,
      `${sheetTitle}!${INCOME_ENTRIES_RANGE}`,
    ],
  });
}

export async function prepareSpreadsheetForNewUsage({
  newSpreadsheetId,
  sheetIdToBeDeleted,
}) {
  await initGApi();

  await deleteSheet({
    spreadsheetId: newSpreadsheetId,
    sheetId: sheetIdToBeDeleted,
  });
}
