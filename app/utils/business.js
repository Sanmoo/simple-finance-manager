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
} from 'utils/repository';
import {
  collectEntriesFromSpreadsheet,
  collectCategoryGoalsFromSpreadsheet,
  addNewEntry as addNewEntryRemote,
} from 'utils/spreadsheet';
import { TYPE_EXPENSE, TYPE_RECEIPT } from 'utils/businessConstants';

export const getSheetTitleForCurrentMonth = () =>
  capitalize(
    format(new Date(), 'MMM-yyyy', {
      locale: pt,
    }),
  );

export async function syncLocalCache(sId) {
  const sheetTitle = getSheetTitleForCurrentMonth();

  await Promise.all([
    cleanUpEntriesForSheetTitle(sheetTitle),
    cleanUpCategoryGoalsForSheetTitle(sheetTitle),
  ]);

  const [entries, categoryGoals] = await Promise.all([
    collectEntriesFromSpreadsheet(sId, sheetTitle),
    collectCategoryGoalsFromSpreadsheet(sId, sheetTitle),
  ]);

  await Promise.all([addEntries(entries), addCategoryGoals(categoryGoals)]);
}

function getPercentage(total, partial) {
  return total !== 0 ? partial / total : partial;
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

export function loadReceiptCategoriesFromCurrentMonthCategoryGoals() {
  const sheetTitle = getSheetTitleForCurrentMonth();
  return loadCategoryNames({
    type: TYPE_RECEIPT,
    originSheetTitle: sheetTitle,
  });
}

export async function addNewEntry(formValues) {
  const sheetTitle = getSheetTitleForCurrentMonth();
  await addNewEntryRemote(formValues);
  await addNewEntryCache({ ...formValues, originSheetTitle: sheetTitle });
}
