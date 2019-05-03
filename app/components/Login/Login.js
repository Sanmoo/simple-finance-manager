import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import GoogleLogin from 'react-google-login';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  justify-content: center;
  align-items: stretch;
  height: 100vh;
  width: 100vw;
  padding-top: 1rem;
  padding-bottom: 1rem;
  padding-left: 1rem;
  padding-right: 1rem;
`;

const InnerContainer = styled.div`
  border: 1px solid rgba(6, 6, 6, 0.5);
  border-radius: 0.5rem;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  align-items: center;
  justify-content: center;
`;

export default function Login({ onGetAuthToken }) {
  const googleAuthCallback = useCallback(
    response => {
      if (response && response.accessToken) {
        const token = response.accessToken;
        onGetAuthToken(token);
      }
    },
    [onGetAuthToken],
  );

  return (
    <Container>
      <InnerContainer>
        <p>Welcome to Simple Finance Manager</p>
        <GoogleLogin
          clientId={process.env.GOOGLE_CLIENT_ID}
          buttonText="LOGIN WITH GOOGLE"
          onSuccess={googleAuthCallback}
          uxMode="redirect"
          onFailure={googleAuthCallback}
          autoLoad
        />
      </InnerContainer>
    </Container>
  );
}

Login.propTypes = {
  onGetAuthToken: PropTypes.func.isRequired,
};
