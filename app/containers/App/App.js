/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React, { useCallback } from 'react';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Dashboard from 'containers/Dashboard/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import Login from 'components/Login';
import reducer from './reducer';
import saga from './saga';

import GlobalStyle from '../../global-styles';

const key = 'global';

export default function App({ authToken, saveKey }) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
  const saveToken = useCallback(token => saveKey('authToken', token), [
    saveKey,
  ]);

  if (!authToken) {
    return <Login onGetAuthToken={saveToken} />;
  }

  if (authToken) {
    return (
      <React.Fragment>
        <Helmet
          titleTemplate="%s - Simple Finance Manager"
          defaultTitle="Simple Finance Manager"
        >
          <meta
            name="description"
            content="A simple app for helping you manage your finances"
          />
        </Helmet>
        <Switch>
          <Route exact path="/" component={Dashboard} />
          <Route path="" component={NotFoundPage} />
        </Switch>
        <GlobalStyle />
      </React.Fragment>
    );
  }
}

App.propTypes = {
  authToken: PropTypes.string,
};
