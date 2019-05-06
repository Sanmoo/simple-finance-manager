/*
 * EditEntryPage Messages
 *
 * This contains all the text for the EditEntryPage container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.EditEntryPage';

export default defineMessages({
  date: {
    id: `${scope}.date`,
    defaultMessage: 'Date',
  },
  description: {
    id: `${scope}.description`,
    defaultMessage: 'Description',
  },
  credit: {
    id: `${scope}.credit`,
    defaultMessage: 'Credit Card',
  },
  category: {
    id: `${scope}.category`,
    defaultMessage: 'Category',
  },
  value: {
    id: `${scope}.value`,
    defaultMessage: 'Value',
  },
});
