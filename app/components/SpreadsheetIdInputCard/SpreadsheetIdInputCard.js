import React, { useState } from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';
import styled from 'styled-components';
import { withTheme } from '@material-ui/core/styles';
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

const LoadingIcon = styled(CircularProgress)`
  margin: ${p => p.theme.spacing.unit};
`;

function SpreadsheetIdInputCard({
  onSubmitSId,
  onCreateNewSpreadsheet,
  isLoading,
  theme,
}) {
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
        <Typography variant="subheading" component="p">
          {"Or click 'Create one for me' if you don't have one yet"}
        </Typography>
      </CardContent>
      <CardActions>
        {isLoading && <LoadingIcon theme={theme} size={20} />}
        <Button
          size="small"
          onClick={() => onSubmitSId(sId)}
          disabled={isLoading || !sId}
        >
          OK
        </Button>
        <Button
          size="small"
          onClick={() => onCreateNewSpreadsheet()}
          disabled={isLoading}
        >
          Create one for me
        </Button>
      </CardActions>
    </Card>
  );
}

SpreadsheetIdInputCard.propTypes = {
  onSubmitSId: PropTypes.func.isRequired,
  onCreateNewSpreadsheet: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withTheme()(SpreadsheetIdInputCard);
