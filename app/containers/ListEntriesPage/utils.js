import { sortBy } from 'lodash';
import { SPREADSHEET_DATE_FORMATS } from 'utils/constants';
import parse from 'date-fns/parse';

export const orderByDateDesc = entries =>
  sortBy(
    entries,
    e => parse(e.date, SPREADSHEET_DATE_FORMATS['pt-BR'], new Date()),
    'desc',
  );
