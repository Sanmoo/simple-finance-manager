import React from 'react';
import 'fake-indexeddb/auto';
import { IntlProvider, injectIntl } from 'react-intl';
import { render, fireEvent } from 'react-testing-library';
import { getSheetTitleForCurrentMonth } from 'utils/business';
import { TYPE_EXPENSE, TYPE_INCOME } from 'utils/businessConstants';
import { addCategoryGoals } from 'utils/repository';
import parse from 'date-fns/parse';
import { EditEntryPage as EditEntryPageOriginal } from '../EditEntryPage';

const EditEntryPage = injectIntl(EditEntryPageOriginal);

describe('<EditEntryPage />', () => {
  let props;
  let firstChild;
  let container;
  const renderComponent = () => {
    ({
      container: { firstChild },
      container,
    } = render(
      <IntlProvider locale="en">
        <EditEntryPage {...props} />
      </IntlProvider>,
    ));
  };

  beforeEach(() => {
    props = {
      theme: {
        spacing: { unit: 1 },
      },
      classes: {},
      formValues: {
        date: parse('2019-02-02', 'yyyy-MM-dd', new Date()),
        description: '',
        credit: true,
        category: '',
        value: 5,
      },
      updateFormValue: jest.fn(),
      onCancelClick: jest.fn(),
      onSubmit: jest.fn(),
      categories: [],
      onCategoriesLoaded: jest.fn(),
      spreadsheetId: 'spreadsheetId',
      submitInProgress: false,
      location: { search: '/mylocation' },
      onSetupEditForm: jest.fn(),
      editingEntriesKey: {
        line: '5',
        type: TYPE_EXPENSE,
        originSheetTitle: 'originSheetTitle',
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

  describe('when a number is input in the form', () => {
    beforeEach(() => {
      renderComponent();
      fireEvent.change(container.querySelector('#entry-value'), {
        target: { value: '6' },
      });
    });

    it('form is updated with the parsed value', () => {
      expect(props.updateFormValue).toHaveBeenCalledWith('value', 6);
    });
  });

  describe('when a number is erased in the form', () => {
    beforeEach(() => {
      renderComponent();
      fireEvent.change(container.querySelector('#entry-value'), {
        target: { value: '' },
      });
    });

    it('form is updated with value as zero', () => {
      expect(props.updateFormValue).toHaveBeenCalledWith('value', 0);
    });
  });

  describe('when there are some categories in database', () => {
    beforeEach(async () => {
      const currentDateSheetTitle = getSheetTitleForCurrentMonth();
      await addCategoryGoals([
        {
          line: '1',
          type: TYPE_EXPENSE,
          originSheetTitle: currentDateSheetTitle,
          value: 1234,
          name: 'cat1',
        },
        {
          line: '2',
          type: TYPE_EXPENSE,
          originSheetTitle: currentDateSheetTitle,
          value: 1235,
          name: 'cat2',
        },
        {
          line: '3',
          type: TYPE_INCOME,
          originSheetTitle: currentDateSheetTitle,
          value: 1235,
          name: 'cat3',
        },
      ]);
    });

    describe('when mode is expense', () => {
      beforeEach(() => {
        props.location.search = `/mylocation?mode=${TYPE_EXPENSE}`;
        renderComponent();
      });

      // Apparently fake-indexeddb does not provide enough indexeddb implementation
      // so that this can be run successfully
      it('should load expense categories from database', () => {
        setTimeout(() => {
          expect(props.onCategoriesLoaded).toHaveBeenCalledWith([
            'cat1',
            'cat2',
          ]);
        }, 500);
      });
    });
  });
});
