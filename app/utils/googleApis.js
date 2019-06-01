const GAPI_INIT_TIMEOUT = 5000;

/**
 * Makes sure Google APIs are initialized and ready to be used
 */
export function initGApi() {
  return new Promise((resolve, reject) => {
    gapi.load('client:auth2', () => {
      const authInstance = gapi.auth2.getAuthInstance();
      if (authInstance && gapi.client.sheets) {
        const authState = authInstance.isSignedIn.get();
        if (authState) {
          return resolve();
        }
      }

      const API_KEY = process.env.GOOGLE_API_KEY;
      const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
      const SCOPE = 'https://www.googleapis.com/auth/spreadsheets';

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
        if (authInstance2 && gapi.client.sheets) {
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

async function getSpreadsheet(spreadsheetId) {
  return (await gapi.client.sheets.spreadsheets.get({ spreadsheetId })).result;
}

export async function getAvailableSheetTitles({ spreadsheetId }) {
  const { sheets } = await getSpreadsheet(spreadsheetId);
  return sheets.map(i => i.properties.title);
}

export async function getSpreadsheetRange({ spreadsheetId, range }) {
  const { result } = await gapi.client.sheets.spreadsheets.values.get({
    spreadsheetId,
    range,
  });

  return result;
}

export async function getSpreadsheetRanges({ spreadsheetId, ranges }) {
  const { result } = await gapi.client.sheets.spreadsheets.values.batchGet({
    spreadsheetId,
    ranges,
  });

  return result;
}

export async function createBlankSpreadsheet(title) {
  const spreadsheetBody = {
    properties: { title },
  };

  const { result } = await gapi.client.sheets.spreadsheets.create(
    {},
    spreadsheetBody,
  );

  const {
    spreadsheetId,
    sheets: [
      {
        properties: { sheetId },
      },
    ],
  } = result;

  return {
    newSpreadsheetId: spreadsheetId,
    newSheetId: sheetId,
  };
}

/**
 *  Assuming a newly (blank) created spreadsheet, copy the template sheet into it,
 *  rename it to the provided name and deletes the original sheet created with the
 *  spreadsheet.
 */
export async function deleteSheet({ spreadsheetId, sheetId }) {
  return gapi.client.sheets.spreadsheets.batchUpdate(
    { spreadsheetId },
    {
      requests: [
        {
          deleteSheet: { sheetId },
        },
      ],
    },
  );
}

export async function copySheet({
  originSpreadsheetId,
  originSheetId,
  targetSpreadsheetId,
}) {
  const response = await gapi.client.sheets.spreadsheets.sheets.copyTo(
    {
      spreadsheetId: originSpreadsheetId,
      sheetId: originSheetId,
    },
    {
      destinationSpreadsheetId: targetSpreadsheetId,
    },
  );

  const {
    result: { sheetId },
  } = response;

  return sheetId;
}

export async function updateSheetTitle({ spreadsheetId, sheetId, title }) {
  return gapi.client.sheets.spreadsheets.batchUpdate(
    { spreadsheetId },
    {
      requests: [
        {
          updateSheetProperties: {
            properties: {
              title,
              sheetId,
            },
            fields: 'title',
          },
        },
      ],
    },
  );
}

export async function fetchSheetIdByTitle({ spreadsheetId, sheetTitle }) {
  const { sheets } = await getSpreadsheet(spreadsheetId);
  return (sheets.find(s => s.properties.title === sheetTitle) || {}).sheetId;
}

export async function clearSheetCellRanges({ spreadsheetId, ranges }) {
  return gapi.client.sheets.spreadsheets.values.clear(
    {
      spreadsheetId,
      range: ranges.join(','),
    },
    {},
  );
}
