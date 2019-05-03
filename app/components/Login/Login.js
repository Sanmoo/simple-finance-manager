import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import GoogleLogin from 'react-google-login';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  justify-content: center;
  align-items: center;
  height: 100vh;
  border: 1px solid rgba(6, 6, 6, 0.5);
  border-radius: 0.5rem;
  margin-top: 6rem;
  margin-bottom: 6rem;
  margin-left: 2rem;
  margin-right: 1rem;
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
      <p>Welcome to Simple Finance Manager</p>
      <GoogleLogin
        clientId={process.env.GOOGLE_CLIENT_ID}
        buttonText="LOGIN WITH GOOGLE"
        onSuccess={googleAuthCallback}
        onFailure={googleAuthCallback}
        autoLoad
      />
    </Container>
  );
}

Login.propTypes = {
  onGetAuthToken: PropTypes.func.isRequired,
};
