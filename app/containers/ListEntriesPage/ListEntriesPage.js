/**
 *
 * ListEntriesPage
 *
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Helmet } from 'react-helmet';
import { Card, CardContent } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import Paper from '@material-ui/core/Paper';
import TableRow from '@material-ui/core/TableRow';
import { withStyles } from '@material-ui/core/styles';
import {
  getSheetTitleForCurrentMonth,
  generateUniqueKeyForEntry,
  getAllEntriesForCurrentMonth,
} from 'utils/business';
import { SPREADSHEET_DATE_FORMATS } from 'utils/constants';
import { TYPE_EXPENSE, TYPE_INCOME } from 'utils/businessConstants';
import parse from 'date-fns/parse';
import format from 'date-fns/format';
import TableToolbar from './TableToolbar';

const extractDateDay = dateAsStr => {
  const date = parse(dateAsStr, SPREADSHEET_DATE_FORMATS['pt-BR'], new Date());
  return format(date, 'd');
};

const styles = () => ({
  root: {
    overflowX: 'auto',
  },
  cell: {
    paddingRight: 0,
  },
  cellValue: {
    minWidth: 100,
  },
  table: {
    minWidth: 400,
  },
});

const SHOWN_TYPE_TITLES = {
  [TYPE_EXPENSE]: 'Despesas',
  [TYPE_INCOME]: 'Receitas',
};

function ListEntriesPage({
  entries,
  classes,
  onViewExpensesClick,
  onViewIncomesClick,
  shownType,
  onEntriesLoaded,
  onEditEntryClick,
}) {
  useEffect(() => {
    getAllEntriesForCurrentMonth().then(onEntriesLoaded);
  }, []);

  return (
    <div>
      <Helmet>
        <title>Listagem de Entradas</title>
        <meta
          name="description"
          content="Página que lista suas entradas já fornecidas"
        />
      </Helmet>
      <Card className="content">
        <CardContent>
          <Paper className={classes.root}>
            <TableToolbar
              title={`${
                SHOWN_TYPE_TITLES[shownType]
              } de ${getSheetTitleForCurrentMonth()}`}
              {...{ onViewExpensesClick, onViewIncomesClick }}
            />
            <Table className={classes.table}>
              <TableBody>
                {entries.map(entry => (
                  <TableRow
                    key={generateUniqueKeyForEntry(entry)}
                    onClick={() => onEditEntryClick(entry)}
                  >
                    <TableCell className={classes.cell}>
                      {extractDateDay(entry.date)}
                    </TableCell>
                    <TableCell align="left" className={classes.cell}>
                      {entry.desc}
                    </TableCell>
                    <TableCell align="left" className={classes.cell}>
                      {entry.category}
                    </TableCell>
                    <TableCell
                      align="left"
                      className={classNames(classes.cell, classes.cellValue)}
                    >
                      {entry.value}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        </CardContent>
      </Card>
    </div>
  );
}

ListEntriesPage.propTypes = {
  classes: PropTypes.object.isRequired,
  entries: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      originSheetTitle: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired,
      category: PropTypes.string.isRequired,
      desc: PropTypes.string.isRequired,
    }),
  ).isRequired,
  location: PropTypes.shape({
    search: PropTypes.string,
  }),
  onEntriesLoaded: PropTypes.func.isRequired,
  onViewExpensesClick: PropTypes.func,
  shownType: PropTypes.oneOf([TYPE_EXPENSE, TYPE_INCOME]),
  onViewIncomesClick: PropTypes.func,
  onEditEntryClick: PropTypes.func.isRequired,
};

export default withStyles(styles)(ListEntriesPage);
