import { SAVE_KEY, SIGN_OFF } from '../constants';

import { saveKey, signOff } from '../actions';

describe('App Actions', () => {
  describe('saveKey', () => {
    it('should return the correct type, key and value', () => {
      const key = 'key';
      const value = 'value';
      const expectedResult = {
        type: SAVE_KEY,
        key,
        value,
      };

      expect(saveKey(key, value)).toEqual(expectedResult);
    });
  });

  describe('signOff', () => {
    it('should return the correct type', () => {
      const expectedResult = {
        type: SIGN_OFF,
      };

      expect(signOff()).toEqual(expectedResult);
    });
  });
});
