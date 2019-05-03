import React, { useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { AppBar, Toolbar } from '@material-ui/core';
import SpreadsheetIdInputCard from 'components/SpreadsheetIdInputCard';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import { syncLocalCache, getDashboardInfo } from 'utils/business';
import Typography from './Typography';
import DashboardContent from './DashboardContent';
import reducer from './reducer';
import saga from './saga';

const key = 'dashboard';

export default function Dashboard({ sId, saveKey, dashInfo }) {
  useEffect(() => {
    if (sId) {
      syncLocalCache(sId)
        .then(getDashboardInfo)
        .then(value => saveKey('dashInfo', value));
    }
  }, [sId, saveKey]);

  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  const onSubmitSId = useCallback(value => saveKey('spreadsheetId', value), [
    saveKey,
  ]);

  if (!sId) {
    return <SpreadsheetIdInputCard onSubmitSId={onSubmitSId} />;
  }

  return (
    <React.Fragment>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" color="inherit">
            Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <DashboardContent {...dashInfo} />
    </React.Fragment>
  );
}

Dashboard.propTypes = {
  sId: PropTypes.string,
  saveKey: PropTypes.func.isRequired,
  dashInfo: PropTypes.object.isRequired,
};
