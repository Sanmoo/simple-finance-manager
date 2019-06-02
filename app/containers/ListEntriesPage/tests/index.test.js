/**
 *
 * Tests for ListEntriesPage
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from 'react';
import { render } from 'react-testing-library';
import { IntlProvider } from 'react-intl';
import { TYPE_EXPENSE } from 'utils/businessConstants';
import 'fake-indexeddb/auto';

import ListEntriesPage from '../ListEntriesPage';
import { DEFAULT_LOCALE } from '../../../i18n';

describe('<ListEntriesPage />', () => {
  let props;

  beforeEach(() => {
    props = {
      entries: [
        {
          date: '10/11/2019',
          type: 'type',
          originSheetTitle: 'May-2019',
          value: 20,
          category: 'Category A',
          desc: 'My Desc',
        },
      ],
      location: {
        search: 'my search',
      },
      onEntriesLoaded: jest.fn(),
      shownType: TYPE_EXPENSE,
      onViewIncomesClick: jest.fn(),
      onViewExpensesClick: jest.fn(),
      onEditEntryClick: jest.fn(),
    };
  });

  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(
      <IntlProvider locale={DEFAULT_LOCALE}>
        <ListEntriesPage {...props} />
      </IntlProvider>,
    );
    expect(spy).not.toHaveBeenCalled();
  });

  it('Should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(
      <IntlProvider locale={DEFAULT_LOCALE}>
        <ListEntriesPage {...props} />
      </IntlProvider>,
    );
    expect(firstChild).toMatchSnapshot();
  });
});
