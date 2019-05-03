import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
  Typography,
  Button,
  Card,
  CardContent,
  CardActions,
  TextField as TF,
} from '@material-ui/core';

const TextField = styled(TF)`
  width: 100%;
`;

export default function SpreadsheetIdInputCard({ onSubmitSId }) {
  const [sId, setId] = useState('');

  return (
    <Card>
      <CardContent>
        <Typography variant="h4" component="h2">
          Please provide your spreadsheet Id
        </Typography>
        <TextField
          id="spreadsheetId"
          label="Your spreadsheet Id"
          value={sId}
          onChange={evt => setId(evt.target.value)}
          margin="normal"
        />
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => onSubmitSId(sId)}>
          OK
        </Button>
      </CardActions>
    </Card>
  );
}

SpreadsheetIdInputCard.propTypes = {
  onSubmitSId: PropTypes.func.isRequired,
};
