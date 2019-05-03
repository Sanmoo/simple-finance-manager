import { capitalize } from 'lodash';
import format from 'date-fns/format';
import pt from 'date-fns/locale/pt';
import {
  cleanUpEntriesForSheetTitle,
  cleanUpCategoryGoalsForSheetTitle,
  addEntries,
  addCategoryGoals,
  getTotalExpensesFromSheet,
  getTotalReceiptFromSheet,
} from 'utils/repository';
import {
  collectEntriesFromSpreadsheet,
  collectCategoryGoalsFromSpreadsheet,
} from 'utils/spreadsheet';

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

export async function getDashboardInfo() {
  const sheetTitle = getSheetTitleForCurrentMonth();

  return {
    totalExpenses: await getTotalExpensesFromSheet(sheetTitle),
    totalReceipt: await getTotalReceiptFromSheet(sheetTitle),
  };
}
