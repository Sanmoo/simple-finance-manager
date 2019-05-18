import { getSpreadsheetRanges, initGApi } from 'utils/googleApis';
import { TYPE_EXPENSE, TYPE_INCOME } from 'utils/businessConstants';
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

  const { valueRanges } = await getSpreadsheetRanges({
    spreadsheetId,
    ranges: [
      `${sheetTitle}!${EXPENSE_ENTRIES_RANGE}`,
      `${sheetTitle}!${INCOME_ENTRIES_RANGE}`,
      `${sheetTitle}!${EXPENSE_CATEGORIES_RANGE}`,
      `${sheetTitle}!${INCOME_CATEGORIES_RANGE}`,
    ],
  });

  const [
    expenseEntries,
    incomeEntries,
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
    range: type === TYPE_EXPENSE ? EXPENSE_ENTRIES_RANGE : INCOME_ENTRIES_RANGE,
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

export async function editEntry(values) {
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
    range: type === TYPE_EXPENSE ? `A${line}:E${line}` : `M${line}:E${line}`,
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
