import { capitalize, sumBy } from 'lodash';
import format from 'date-fns/format';
import pt from 'date-fns/locale/pt';
import {
  cleanUpEntriesForSheetTitle,
  cleanUpCategoryGoalsForSheetTitle,
  addEntries,
  addCategoryGoals,
  getExpensesFromSheet,
  getCategoryGoalsFromSheet,
  loadCategoryNames,
  addNewEntry as addNewEntryCache,
  getEntries,
} from 'utils/repository';
import {
  collectSpreadsheetData,
  addNewEntry as addNewEntryRemote,
} from 'utils/spreadsheet';
import { TYPE_EXPENSE, TYPE_INCOME } from 'utils/businessConstants';

export const getSheetTitleForCurrentMonth = () =>
  capitalize(
    format(new Date(), 'MMM-yyyy', {
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
  const line = await addNewEntryRemote(formValues);
  await addNewEntryCache({ ...formValues, originSheetTitle: sheetTitle, line });
}
