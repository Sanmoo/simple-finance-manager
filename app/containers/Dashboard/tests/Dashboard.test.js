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

import { Dashboard } from '../Dashboard';
import { DEFAULT_LOCALE } from '../../../i18n';

describe('<Dashboard />', () => {
  let props;

  beforeEach(() => {
    props = {
      sId: 'mysid',
      onSpreadsheetIdProvided: jest.fn(),
      dashInfo: [],
      onAddIncome: jest.fn(),
      onAddExpense: jest.fn(),
      addEntryButtonEnabled: true,
      onCreateNewSpreadsheet: jest.fn(),
      isLoading: false,
      actionableDialogType: 'type',
      onCreateSheetFromGenericTemplate: jest.fn(),
      onTrySyncAgain: jest.fn(),
      onCreateSheetFromPreviousMonth: jest.fn(),
      classes: {},
    };
  });

  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(
      <IntlProvider locale={DEFAULT_LOCALE}>
        <Dashboard {...props} />
      </IntlProvider>,
    );
    expect(spy).not.toHaveBeenCalled();
  });

  it('Should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(
      <IntlProvider locale={DEFAULT_LOCALE}>
        <Dashboard {...props} />
      </IntlProvider>,
    );
    expect(firstChild).toMatchSnapshot();
  });

  describe('when sId is not provided', () => {
    beforeEach(() => {
      props.sId = null;
    });

    it('should render input component and match the snapshot', () => {
      const {
        container: { firstChild },
        container,
      } = render(
        <IntlProvider locale={DEFAULT_LOCALE}>
          <Dashboard {...props} />
        </IntlProvider>,
      );
      expect(container.querySelector('input')).not.toBeNull();
      expect(firstChild).toMatchSnapshot();
    });
  });

  describe('when sId is provided', () => {
    beforeEach(() => {
      props.sId = 'something';
    });

    it('should not render input component and match the snapshot', () => {
      const {
        container: { firstChild },
        container,
      } = render(
        <IntlProvider locale={DEFAULT_LOCALE}>
          <Dashboard {...props} />
        </IntlProvider>,
      );
      expect(container.querySelector('input')).toBeNull();
      expect(firstChild).toMatchSnapshot();
    });
  });
});
