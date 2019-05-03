const GAPI_INIT_TIMEOUT = 1600;

/**
 * Makes sure Google APIs are initialized and ready to be used
 */
export function initGApi() {
  return new Promise((resolve, reject) => {
    gapi.load('client:auth2', () => {
      if (!gapi.auth2) {
        return reject();
      }

      const authInstance = gapi.auth2.getAuthInstance();
      if (authInstance) {
        const authState = authInstance.isSignedIn.get();
        if (authState) {
          return resolve();
        }
      }

      const API_KEY = process.env.GOOGLE_API_KEY;
      const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;

      // TODO: Authorize this other scope
      //   'https://www.googleapis.com/auth/spreadsheets'
      const SCOPE = 'https://www.googleapis.com/auth/spreadsheets.readonly';

      gapi.client
        .init({
          apiKey: API_KEY,
          clientId: CLIENT_ID,
          scope: SCOPE,
          discoveryDocs: [
            'https://sheets.googleapis.com/$discovery/rest?version=v4',
          ],
        })
        .then(resolve, reject);

      // Workaround: gapi.client.init seems buggy, never resolves or rejects
      return setTimeout(() => {
        const authInstance2 = gapi.auth2.getAuthInstance();
        if (authInstance2) {
          const authState = authInstance2.isSignedIn.get();
          if (authState) {
            return resolve();
          }
        }
        return reject(new Error('Timed out'));
      }, GAPI_INIT_TIMEOUT);
    });
  });
}

export async function getAvailableSheetTitles({ spreadsheetId }) {
  const {
    result: { sheets },
  } = await gapi.client.sheets.spreadsheets.get({ spreadsheetId });
  return sheets.map(i => i.properties.title);
}

export async function getSpreadsheetRange({ spreadsheetId, range }) {
  const { result } = await gapi.client.sheets.spreadsheets.values.get({
    spreadsheetId,
    range,
  });

  return result;
}
