/**
 *
 * Tests for EditEntryPage
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from 'react';
import { render } from 'react-testing-library';
import { IntlProvider } from 'react-intl';
import 'fake-indexeddb/auto';

import EditEntryPage from '../EditEntryPage';
import { DEFAULT_LOCALE } from '../../../i18n';

describe('<EditEntryPage />', () => {
  let props;

  beforeEach(() => {
    props = {
      formValues: {
        date: new Date(),
        description: 'anything',
        credit: true,
        category: 'My Category',
        value: 50,
      },
      updateFormValue: jest.fn(),
      onCancelClick: jest.fn(),
      onSubmit: jest.fn(),
      categories: ['Category A', 'Category B'],
      onCategoriesLoaded: jest.fn(),
      spreadsheetId: '1234',
      submitInProgress: false,
      location: { search: 'My location' },
      onSetupEditForm: jest.fn(),
      editingEntriesKey: {
        line: 'this is a line',
        type: 'receipty',
        originSheetTitle: 'Mai-2019',
      },
    };
  });

  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(
      <IntlProvider locale={DEFAULT_LOCALE}>
        <EditEntryPage {...props} />
      </IntlProvider>,
    );
    expect(spy).not.toHaveBeenCalled();
  });

  it('Should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(
      <IntlProvider locale={DEFAULT_LOCALE}>
        <EditEntryPage {...props} />
      </IntlProvider>,
    );
    expect(firstChild).toMatchSnapshot();
  });
});
