import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import SpreadsheetIdInputCard from 'components/SpreadsheetIdInputCard';
import { syncLocalCache, getDashboardInfo } from 'utils/business';
import SfmNavBar from 'containers/SfmNavBar';
import { withStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import DashboardContent from './DashboardContent';

const styles = theme => ({
  fab: {
    margin: theme.spacing.unit,
    position: 'fixed',
    top: `calc(100vh - 56px - ${theme.spacing.unit * 2}px)`,
    left: `calc(100vw - 56px - ${theme.spacing.unit * 2}px)`,
  },
});

const DashboardContainer = styled.div`
  padding-bottom: 56px;
`;

function Dashboard({
  sId,
  saveKey,
  dashInfo,
  classes,
  onAddClick,
  onSpreadsheetIdProvided,
  addEntryButtonEnabled,
}) {
  useEffect(() => {
    if (sId) {
      syncLocalCache(sId)
        .then(getDashboardInfo)
        .then(value => saveKey('dashInfo', value));
    }
  }, [sId, saveKey]);

  if (!sId) {
    return <SpreadsheetIdInputCard onSubmitSId={onSpreadsheetIdProvided} />;
  }

  return (
    <DashboardContainer>
      <SfmNavBar />
      <DashboardContent dashInfo={dashInfo} />
      {addEntryButtonEnabled && (
        <Fab
          color="primary"
          aria-label="Add"
          className={classes.fab}
          onClick={onAddClick}
        >
          <AddIcon />
        </Fab>
      )}
    </DashboardContainer>
  );
}

Dashboard.propTypes = {
  sId: PropTypes.string,
  saveKey: PropTypes.func.isRequired,
  onSpreadsheetIdProvided: PropTypes.func.isRequired,
  dashInfo: PropTypes.any,
  classes: PropTypes.object.isRequired,
  onAddClick: PropTypes.func.isRequired,
  addEntryButtonEnabled: PropTypes.bool.isRequired,
};

export default withStyles(styles)(Dashboard);
