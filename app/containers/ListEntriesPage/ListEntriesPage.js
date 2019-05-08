/**
 *
 * ListEntriesPage
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import messages from './messages';

export default function ListEntriesPage() {
  return (
    <div>
      <Helmet>
        <title>List Entries</title>
        <meta name="description" content="Página que lista suas entradas já fornecidas" />
      </Helmet>
      <FormattedMessage {...messages.header} />
    </div>
  );
}

ListEntriesPage.propTypes = {};
