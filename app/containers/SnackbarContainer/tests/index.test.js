/**
 *
 * Tests for SnackbarContainer
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from 'react';
import { render } from 'react-testing-library';

import SnackbarContainer from '../SnackbarContainer';

describe('<SnackbarContainer />', () => {
  let props;

  beforeEach(() => {
    props = {
      open: false,
      onClose: jest.fn(),
      message: 'This is my testing message',
    };
  });

  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(<SnackbarContainer {...props} />);
    expect(spy).not.toHaveBeenCalled();
  });

  it('Should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(<SnackbarContainer {...props} />);
    expect(firstChild).toMatchSnapshot();
  });
});
