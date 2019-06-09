import {
  DASHBOARD_PAGE,
  EDIT_ENTRY_PAGE,
  LIST_ENTRY_PAGE,
} from 'utils/businessConstants';

import {
  selectGlobal,
  makeSelectCurrentUser,
  makeSelectLoading,
  makeSelectError,
  makeSelectRepos,
  makeSelectLocation,
  makeSelectCurrentPage,
  makeSelectAuthToken,
  makeSelectSId,
  makeSelectSUrl,
} from '../selectors';

describe('selectGlobal', () => {
  it('should select the global state', () => {
    const globalState = {};
    const mockedState = {
      global: globalState,
    };
    expect(selectGlobal(mockedState)).toEqual(globalState);
  });
});

describe('makeSelectCurrentUser', () => {
  const currentUserSelector = makeSelectCurrentUser();
  it('should select the current user', () => {
    const username = 'mxstbr';
    const mockedState = {
      global: {
        currentUser: username,
      },
    };
    expect(currentUserSelector(mockedState)).toEqual(username);
  });
});

describe('makeSelectLoading', () => {
  const loadingSelector = makeSelectLoading();
  it('should select the loading', () => {
    const loading = false;
    const mockedState = {
      global: {
        loading,
      },
    };
    expect(loadingSelector(mockedState)).toEqual(loading);
  });
});

describe('makeSelectError', () => {
  const errorSelector = makeSelectError();
  it('should select the error', () => {
    const error = 404;
    const mockedState = {
      global: {
        error,
      },
    };
    expect(errorSelector(mockedState)).toEqual(error);
  });
});

describe('makeSelectRepos', () => {
  const reposSelector = makeSelectRepos();
  it('should select the repos', () => {
    const repositories = [];
    const mockedState = {
      global: {
        userData: {
          repositories,
        },
      },
    };
    expect(reposSelector(mockedState)).toEqual(repositories);
  });
});

describe('makeSelectLocation', () => {
  const locationStateSelector = makeSelectLocation();
  it('should select the location', () => {
    const router = {
      location: { pathname: '/foo' },
    };
    const mockedState = {
      router,
    };
    expect(locationStateSelector(mockedState)).toEqual(router.location);
  });
});

describe('makeSelectCurrentPage', () => {
  it('should select the current page', () => {
    const router = {
      location: { pathname: '/' },
    };
    const mockedState = {
      router,
    };
    expect(makeSelectCurrentPage()(mockedState)).toEqual(DASHBOARD_PAGE);
    mockedState.router.location.pathname = '/entry';
    expect(makeSelectCurrentPage()(mockedState)).toEqual(EDIT_ENTRY_PAGE);
    router.location.pathname = '/entries';
    expect(makeSelectCurrentPage()(mockedState)).toEqual(LIST_ENTRY_PAGE);
  });
});

describe('makeSelectAuthToken', () => {
  const authTokenSelector = makeSelectAuthToken();
  it('should select auth token', () => {
    const authToken = 'asdfs';
    const mockedState = {
      global: {
        authToken,
      },
    };
    expect(authTokenSelector(mockedState)).toEqual(authToken);
  });
});

describe('makeSelectSId', () => {
  const sIdSelector = makeSelectSId();
  it('should select spreadsheet id', () => {
    const spreadsheetId = 'asdfs';
    const mockedState = {
      global: {
        spreadsheetId,
      },
    };
    expect(sIdSelector(mockedState)).toEqual(spreadsheetId);
  });
});

describe('makeSelectSUrl', () => {
  const sUrlSelector = makeSelectSUrl();
  it('should select spreadsheet url', () => {
    const spreadsheetUrl = 'asdfs';
    const mockedState = {
      global: {
        spreadsheetUrl,
      },
    };
    expect(sUrlSelector(mockedState)).toEqual(spreadsheetUrl);
  });
});
