import { capitalize, sumBy } from 'lodash';
import format from 'date-fns/format';
import pt from 'date-fns/locale/pt';
import subMonths from 'date-fns/subMonths';
import {
  cleanUpEntriesForSheetTitle,
  cleanUpCategoryGoalsForSheetTitle,
  addEntries,
  addCategoryGoals,
  getExpensesFromSheet,
  getCategoryGoalsFromSheet,
  loadCategoryNames,
  putEntry as putEntryCache,
  getEntries,
} from 'utils/repository';
import {
  collectSpreadsheetData,
  addNewEntry as addNewEntryRemote,
  editEntry as editEntryRemote,
  createNewSpreadsheet,
  prepareSpreadsheetForNewUsage,
  verifySheetExistence,
  copySheetWithANewName,
  cleanAllEntries,
} from 'utils/spreadsheet';
import { TYPE_EXPENSE, TYPE_INCOME } from 'utils/businessConstants';

export const TEMPLATE_SPREADSHEET_ID =
  '1pxsoePTtDPMR2Af_Z8Ojeuj8yk4a-63nLV-j65BWp1g';
export const TEMPLATE_SHEET_ID = '736371080';

export const getSheetTitleForCurrentMonth = () =>
  capitalize(
    format(new Date(), 'MMM-yyyy', {
      locale: pt,
    }),
  );

export const getPreviousMonthSheetName = () =>
  capitalize(
    format(subMonths(new Date(), 1), 'MMM-yyyy', {
      locale: pt,
    }),
  );

export const generateUniqueKeyForEntry = entry =>
  `${entry.line}-${entry.originSheetTitle}-${entry.type}`;

export async function syncLocalCache(sId) {
  const sheetTitle = getSheetTitleForCurrentMonth();

  await Promise.all([
    cleanUpEntriesForSheetTitle(sheetTitle),
    cleanUpCategoryGoalsForSheetTitle(sheetTitle),
  ]);

  const { entries, categoryGoals } = await collectSpreadsheetData(
    sId,
    sheetTitle,
  );

  await Promise.all([addEntries(entries), addCategoryGoals(categoryGoals)]);
}

function getPercentage(total, partial) {
  return parseFloat((total !== 0 ? partial / total : partial).toFixed(2));
}

export async function getAllEntriesForCurrentMonth() {
  const sheetTitle = getSheetTitleForCurrentMonth();
  const records = await getEntries({ sheetTitle });
  records.forEach(r => {
    r.value = parseFloat(r.value || 0); // eslint-disable-line
  });
  return records;
}

export async function getDashboardInfo() {
  const sheetTitle = getSheetTitleForCurrentMonth();
  const [categoryExpenses, expenses] = await Promise.all([
    getCategoryGoalsFromSheet(sheetTitle),
    getExpensesFromSheet(sheetTitle),
  ]);

  const returned = categoryExpenses.map(categoryExpense => ({
    name: categoryExpense.name,
    goal: parseFloat(categoryExpense.value || 0),
    actualPercentage: getPercentage(
      parseFloat(categoryExpense.value || 0),
      sumBy(expenses.filter(e => e.category === categoryExpense.name), e =>
        parseFloat(e.value || 0),
      ),
    ),
  }));

  return returned;
}

export function loadExpenseCategoriesFromCurrentMonthCategoryGoals() {
  const sheetTitle = getSheetTitleForCurrentMonth();
  return loadCategoryNames({
    type: TYPE_EXPENSE,
    originSheetTitle: sheetTitle,
  });
}

export function loadIncomeCategoriesFromCurrentMonthCategoryGoals() {
  const sheetTitle = getSheetTitleForCurrentMonth();
  return loadCategoryNames({
    type: TYPE_INCOME,
    originSheetTitle: sheetTitle,
  });
}

export async function addNewEntry(formValues) {
  const sheetTitle = getSheetTitleForCurrentMonth();
  if (formValues && formValues.line) {
    await editEntryRemote(sheetTitle, formValues);
    await putEntryCache(formValues);
  } else {
    const line = await addNewEntryRemote(sheetTitle, formValues);
    await putEntryCache({ ...formValues, originSheetTitle: sheetTitle, line });
  }
}

export async function createNewSpreadsheetFromTemplate() {
  const sheetTitle = getSheetTitleForCurrentMonth();

  const { newSpreadsheetId, newSheetId } = await createNewSpreadsheet(
    'Planilha de Gastos',
  );

  const sheetId = await createSheetFromGenericTemplate(newSpreadsheetId);

  await prepareSpreadsheetForNewUsage({
    newSpreadsheetId,
    newSheetId: sheetId,
    sheetIdToBeDeleted: newSheetId,
    sheetTitle,
  });

  return {
    spreadsheetId: newSpreadsheetId,
    sheetId,
  };
}

export async function createSheetFromGenericTemplate(sId) {
  await copySheetWithANewName({
    originSpreadsheetId: TEMPLATE_SPREADSHEET_ID,
    originSheetId: TEMPLATE_SHEET_ID,
    targetSpreadsheetId: sId,
    targetSheetTitle: getSheetTitleForCurrentMonth(),
  });
}

export async function createSheetFromPreviousMonth(sId) {
  const previousMonthSheetTitle = getPreviousMonthSheetName();
  const currentMonthSheetTitle = getSheetTitleForCurrentMonth();

  await copySheetWithANewName({
    originSpreadsheetId: sId,
    originSheetName: previousMonthSheetTitle,
    targetSpreadsheetId: sId,
    targetSheetTitle: currentMonthSheetTitle,
  });

  await cleanAllEntries({
    spreadsheetId: sId,
    sheetTitle: currentMonthSheetTitle,
  });
}

export { verifySheetExistence };
