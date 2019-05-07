import Dexie from 'dexie';
import {
  DATABASE_NAME,
  TYPE_EXPENSE,
  TYPE_RECEIPT,
} from 'utils/businessConstants';
import { sumBy } from 'lodash';

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
  db.categoryGoal
    .where('originSheetTitle')
    .equalsIgnoreCase(sheetTitle)
    .delete();
};

export const addEntries = entries => db.entries.bulkPut(entries);
export const addCategoryGoals = cGoals => db.categoryGoal.bulkPut(cGoals);

export async function getExpensesFromSheet(sheetTitle) {
  return get('entries', {
    originSheetTitle: sheetTitle,
    type: TYPE_EXPENSE,
  });
}

export async function getCategoryGoalsFromSheet(sheetTitle) {
  return get('categoryGoal', {
    originSheetTitle: sheetTitle,
    type: TYPE_EXPENSE,
  });
}

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

async function get(collection, query) {
  return db[collection].where(query).toArray();
}

async function getAggregateSum(collection, query) {
  const records = await get(collection, query);
  return sumBy(records, record => parseFloat(record.value));
}

export async function loadCategoryNames(query) {
  const records = await get('categoryGoal', query);
  return records.map(r => r.name);
}

export async function addNewEntry(values) {
  const {
    type,
    date,
    description,
    credit,
    value,
    category,
    originSheetTitle,
  } = values;

  const cacheObj = {
    type,
    desc: description,
    date,
    credit,
    value,
    category,
    originSheetTitle,
  };

  await db.entries.put(cacheObj);
}
