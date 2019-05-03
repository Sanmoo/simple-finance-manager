import Dexie from 'dexie';
import {
  DATABASE_NAME,
  TYPE_EXPENSE,
  TYPE_RECEIPT,
} from 'utils/businessConstants';

// Database and Collections Setup
const db = new Dexie(DATABASE_NAME);
db.version(1).stores({
  entries:
    '++id,line,date,desc,credit,category,value,originSheetTitle,type,[originSheetTitle+type]',
  categoryGoal: '++id,name,type,value,originSheetTitle,[originSheetTitle+type]',
});

export const cleanUpEntriesForSheetTitle = sheetTitleForCurrentMonth => {
  db.entries
    .where('originSheetTitle')
    .equalsIgnoreCase(sheetTitleForCurrentMonth)
    .delete();
};

export const cleanUpCategoryGoalsForSheetTitle = sheetTitle => {
  db.entries
    .where('originSheetTitle')
    .equalsIgnoreCase(sheetTitle)
    .delete();
};

export const addEntries = entries => db.entries.bulkPut(entries);
export const addCategoryGoals = cGoals => db.categoryGoal.bulkPut(cGoals);

export async function getTotalExpensesFromSheet(sheetTitle) {
  return getAggregateSum('entries', {
    originSheetTitle: sheetTitle,
    type: TYPE_EXPENSE,
  });
}

export async function getTotalReceiptFromSheet(sheetTitle) {
  return getAggregateSum('entries', {
    originSheetTitle: sheetTitle,
    type: TYPE_RECEIPT,
  });
}

async function getAggregateSum(collection, query) {
  const records = await db[collection].where(query).toArray();
  return records.reduce((acc, cur) => acc + parseFloat(cur.value), 0);
}
