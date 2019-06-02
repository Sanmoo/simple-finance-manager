/**
 *
 * Tests for ConfirmationDialog
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from 'react';
import { render } from 'react-testing-library';
// import 'jest-dom/extend-expect'; // add some helpful assertions

import ConfirmationDialog from '../ConfirmationDialog';

describe('<ConfirmationDialog />', () => {
  let props;

  beforeEach(() => {
    props = {
      opened: false,
      onDismiss: jest.fn(),
      title: 'My Title',
      onConfirm: jest.fn(),
      onConfirmText: 'Confirm',
      content: 'My content',
      onDismissText: 'Dismiss',
    };
  });

  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(<ConfirmationDialog {...props} />);
    expect(spy).not.toHaveBeenCalled();
  });

  it('Should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(<ConfirmationDialog {...props} />);
    expect(firstChild).toMatchSnapshot();
  });
});
