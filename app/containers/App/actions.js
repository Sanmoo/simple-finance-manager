import { SAVE_KEY, SIGN_OFF } from './constants';

export const saveKey = (key, value) => ({
  type: SAVE_KEY,
  key,
  value,
});

export const signOff = () => ({ type: SIGN_OFF });
