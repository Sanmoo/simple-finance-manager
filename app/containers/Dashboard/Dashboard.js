import React, { useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import SpreadsheetIdInputCard from 'components/SpreadsheetIdInputCard';
import { syncLocalCache, getDashboardInfo } from 'utils/business';
import SfmNavBar from 'containers/SfmNavBar';
import DashboardContent from './DashboardContent';

export default function Dashboard({ sId, saveKey, dashInfo }) {
  useEffect(() => {
    if (sId) {
      syncLocalCache(sId)
        .then(getDashboardInfo)
        .then(value => saveKey('dashInfo', value));
    }
  }, [sId, saveKey]);

  const onSubmitSId = useCallback(value => saveKey('spreadsheetId', value), [
    saveKey,
  ]);

  if (!sId) {
    return <SpreadsheetIdInputCard onSubmitSId={onSubmitSId} />;
  }

  return (
    <>
      <SfmNavBar />
      <DashboardContent {...dashInfo} />
    </>
  );
}

Dashboard.propTypes = {
  sId: PropTypes.string,
  saveKey: PropTypes.func.isRequired,
  dashInfo: PropTypes.object.isRequired,
};
