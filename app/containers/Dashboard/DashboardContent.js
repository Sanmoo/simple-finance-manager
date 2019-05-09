import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import Paper from '@material-ui/core/Paper';
import TableRow from '@material-ui/core/TableRow';
import { Card, CardContent, Typography } from '@material-ui/core';

const styles = theme => ({
  root: {
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  cell: {
    paddingRight: 0,
  },
});

const GreenSpan = styled.span`
  color: green;
`;
const RedSpan = styled.span`
  color: red;
`;

const formatPercentage = percentage => {
  const asString = `${Math.round(percentage * 100)}%`;

  if (percentage > 1) {
    return <RedSpan>{asString}</RedSpan>;
  }

  return <GreenSpan>{asString}</GreenSpan>;
};

const formatActualUsage = (basis, value) => {
  if (basis !== 0) {
    return formatPercentage(value);
  }

  if (value === 0) {
    return <GreenSpan>{value}</GreenSpan>;
  }

  return <RedSpan>{value}</RedSpan>;
};

function DashboardContent({ classes, dashInfo }) {
  return (
    <Card className="content">
      <CardContent>
        <Typography variant="h5" component="h2">
          Metas e Despesas
        </Typography>
        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableBody>
              {dashInfo.map(row => (
                <TableRow key={row.name}>
                  <TableCell className={classes.cell}>{row.name}</TableCell>
                  <TableCell align="right" className={classes.cell}>
                    {row.goal}
                  </TableCell>
                  <TableCell align="right" className={classes.cell}>
                    {formatActualUsage(row.goal, row.actualPercentage)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </CardContent>
    </Card>
  );
}

DashboardContent.propTypes = {
  classes: PropTypes.object.isRequired,
  dashInfo: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      goal: PropTypes.number.isRequired,
      actualPercentage: PropTypes.number.isRequired,
    }),
  ).isRequired,
};

export default withStyles(styles)(DashboardContent);
