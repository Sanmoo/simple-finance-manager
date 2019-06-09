/**
 *
 * Tests for ConfirmationDialog
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from 'react';
import { render, fireEvent } from 'react-testing-library';
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

  describe('when it is opened', () => {
    beforeEach(() => {
      props.opened = true;
    });

    it('renders modal content', () => {
      const { getByText } = render(<ConfirmationDialog {...props} />);
      expect(getByText(props.title)).not.toBeNull();
      expect(getByText(props.onConfirmText)).not.toBeNull();
      expect(getByText(props.content)).not.toBeNull();
      expect(getByText(props.onDismissText)).not.toBeNull();
    });

    describe('when ok is clicked', () => {
      beforeEach(() => {
        const { getByText } = render(<ConfirmationDialog {...props} />);
        fireEvent.click(getByText(props.onConfirmText));
      });

      it('onConfirm callback is called 1 time', () => {
        expect(props.onConfirm).toHaveBeenCalledTimes(1);
      });
    });

    describe('when dismiss is clicked', () => {
      beforeEach(() => {
        const { getByText } = render(<ConfirmationDialog {...props} />);
        fireEvent.click(getByText(props.onDismissText));
      });

      it('onDismiss callback is clicked one time', () => {
        expect(props.onDismiss).toHaveBeenCalledTimes(1);
      });
    });
  });
});
