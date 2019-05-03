import { SAVE_KEY } from './constants';

export function saveKey(key, value) {
  return {
    type: SAVE_KEY,
    key,
    value,
  };
}
