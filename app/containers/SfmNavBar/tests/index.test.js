/**
 *
 * Tests for SfmNavBar
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from 'react';
import { render } from 'react-testing-library';
// import 'jest-dom/extend-expect'; // add some helpful assertions

import SfmNavBar from '../SfmNavBar';

describe('<SfmNavBar />', () => {
  let props;

  beforeEach(() => {
    props = {
      onSignOff: jest.fn(),
      title: 'This is my title',
      drawerOpen: false,
      onDrawerOpen: jest.fn(),
      onDrawerClose: jest.fn(),
      onDashboardClick: jest.fn(),
      onEntriesClick: jest.fn(),
      onGoToSpreadsheetClick: jest.fn(),
      onCopySpreadsheetLinkClicked: jest.fn(),
      spreadsheetUrl: 'url-test',
    };
  });

  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(<SfmNavBar {...props} />);
    expect(spy).not.toHaveBeenCalled();
  });

  it('Should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(<SfmNavBar {...props} />);
    expect(firstChild).toMatchSnapshot();
  });
});
