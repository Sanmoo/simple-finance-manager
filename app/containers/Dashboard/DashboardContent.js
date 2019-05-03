import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardContent, Typography } from '@material-ui/core';

export default function DashboardComponent({ totalExpenses, totalReceipt }) {
  return (
    <Card className="content">
      <CardContent>
        <Typography variant="h5" component="h2">
          Performance this month
        </Typography>
        <p>Total receipt: R$ {totalReceipt}</p>
        <p>Total expenses: R$ {totalExpenses}</p>
      </CardContent>
    </Card>
  );
}

DashboardComponent.propTypes = {
  totalExpenses: PropTypes.number.isRequired,
  totalReceipt: PropTypes.number.isRequired,
};
