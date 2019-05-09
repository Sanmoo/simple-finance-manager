import queryString from 'query-string';
import { TYPE_EXPENSE } from 'utils/businessConstants';

export const modeFromLocation = location => {
  if (location && location.search) {
    const { mode } = queryString.parse(location.search);
    return mode;
  }

  return TYPE_EXPENSE;
};
