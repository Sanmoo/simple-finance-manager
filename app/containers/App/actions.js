import { SAVE_KEY } from './constants';

export const saveKey = (key, value) => ({
  type: SAVE_KEY,
  key,
  value,
});
