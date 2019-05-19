const GAPI_INIT_TIMEOUT = 5000;
const TEMPLATE_SPREADSHEET_ID = '1pxsoePTtDPMR2Af_Z8Ojeuj8yk4a-63nLV-j65BWp1g';
const TEMPLATE_SHEET_ID = '736371080';

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

export async function getSpreadsheetRanges({ spreadsheetId, ranges }) {
  const { result } = await gapi.client.sheets.spreadsheets.values.batchGet({
    spreadsheetId,
    ranges,
  });

  return result;
}

export async function createNewSpreadsheet(title) {
  initGApi();

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
export async function createNewSheetFromTemplateWithTitle(
  spreadsheetId,
  oldSheetId,
  sheetTitle,
) {
  initGApi();

  // Copy template sheet into provided spreadsheet
  const response = await gapi.client.sheets.spreadsheets.sheets.copyTo(
    {
      spreadsheetId: TEMPLATE_SPREADSHEET_ID,
      sheetId: TEMPLATE_SHEET_ID,
    },
    {
      destinationSpreadsheetId: spreadsheetId,
    },
  );

  const {
    result: { sheetId },
  } = response;

  // Rename this recently created sheet to be sheet title and delete original one
  await gapi.client.sheets.spreadsheets.batchUpdate(
    { spreadsheetId },
    {
      requests: [
        {
          updateSheetProperties: {
            properties: {
              title: sheetTitle,
              sheetId,
            },
            fields: 'title',
          },
        },
        {
          deleteSheet: {
            sheetId: oldSheetId,
          },
        },
      ],
    },
  );

  return sheetId;
}
