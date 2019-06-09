/**
 *
 * Tests for SpreadsheetIdInputCard
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from 'react';
import { render, fireEvent } from 'react-testing-library';
import 'jest-dom/extend-expect';
import { SpreadsheetIdInputCard } from '../SpreadsheetIdInputCard';

describe('<SpreadsheetIdInputCard />', () => {
  let props;
  let firstChild;
  let getByText;
  let getByLabelText;
  const renderComponent = () => {
    ({
      container: { firstChild },
      getByText,
      getByLabelText,
    } = render(<SpreadsheetIdInputCard {...props} />));
  };

  beforeEach(() => {
    props = {
      onSubmitSId: jest.fn(),
      onCreateNewSpreadsheet: jest.fn(),
      isLoading: false,
      theme: {
        spacing: { unit: 1 },
      },
    };
  });

  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    renderComponent();
    expect(spy).not.toHaveBeenCalled();
  });

  it('Should render and match the snapshot', () => {
    renderComponent();
    expect(firstChild).toMatchSnapshot();
  });

  it('should show button OK disabled', () => {
    renderComponent();
    expect(getByText('OK')).toBeDisabled();
  });

  describe('when I type a spreadsheet Id', () => {
    beforeEach(() => {
      renderComponent();
      fireEvent.change(getByLabelText('Your spreadsheet Id'), {
        target: { value: 'something' },
      });
    });

    it('should show button OK enabled', () => {
      expect(getByText('OK')).not.toBeDisabled();
    });

    describe('when ok is clicked', () => {
      beforeEach(() => {
        fireEvent.click(getByText('OK'));
      });

      it('submit callback is called', () => {
        expect(props.onSubmitSId).toHaveBeenCalledWith('something');
      });
    });
  });

  describe('when I click on the create one for me button', () => {
    beforeEach(() => {
      renderComponent();
      fireEvent.click(getByText('Create one for me'));
    });

    it('calls prop onCreateNewSpreadsheet back', () => {
      expect(props.onCreateNewSpreadsheet).toHaveBeenCalledTimes(1);
    });
  });
});
