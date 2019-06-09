/**
 * Tests for HomePage sagas
 */

import { takeLatest } from 'redux-saga/effects';
import { SAVE_KEY, SIGN_OFF } from 'containers/App/constants';
import { saveKey, signOff } from 'containers/App/actions';
import saga, { handleSaveKey, handleSignOff } from '../saga';

describe('handleSaveKey Saga', () => {
  it('should not save anything to localStorage if not one of the preconfigured keys', () => {
    handleSaveKey(saveKey('authToken2', 'myAuthToken')).next();
    handleSaveKey(saveKey('spreadsheetId2', 'mySpreadsheetId')).next();
    handleSaveKey(saveKey('spreadsheetUrl2', 'mySpreadsheetUrl')).next();
    expect(localStorage.getItem('authToken')).toBeNull();
  });

  it('should save values to localStorage if the key is a known one', () => {
    handleSaveKey(saveKey('authToken', 'myAuthToken')).next();
    expect(localStorage.getItem('authToken')).toBe('myAuthToken');
    handleSaveKey(saveKey('spreadsheetId', 'mySpreadsheetId')).next();
    expect(localStorage.getItem('spreadsheetId')).toBe('mySpreadsheetId');
    handleSaveKey(saveKey('spreadsheetUrl', 'mySpreadsheetUrl')).next();
    expect(localStorage.getItem('spreadsheetUrl')).toBe('mySpreadsheetUrl');
  });
});

describe('given localStorage have some values in it', () => {
  beforeEach(() => {
    localStorage.setItem('key', 'value');
    expect(localStorage.getItem('key')).toBe('value');
  });

  describe('handleSignOff', () => {
    it('clears the localStorage', () => {
      handleSignOff(signOff()).next();
      expect(localStorage.getItem('key')).toBeNull();
    });
  });
});

describe('saga', () => {
  const appSaga = saga();

  it('should start task to watch for SAVE_KEY and SIGN_OFF actions', () => {
    const takeLatestDescriptors = [appSaga.next().value, appSaga.next().value];
    expect(takeLatestDescriptors).toContainEqual(
      takeLatest(SAVE_KEY, handleSaveKey),
    );
    expect(takeLatestDescriptors).toContainEqual(
      takeLatest(SIGN_OFF, handleSignOff),
    );
  });
});
