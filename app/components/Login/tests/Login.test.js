/**
 *
 * Tests for ConfirmationDialog
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from 'react';
import { render } from 'react-testing-library';
import ShallowRenderer from 'react-test-renderer/shallow';
import { findWithType } from 'react-shallow-testutils';
import GoogleLogin from 'react-google-login';
import Login from '../Login';

const renderer = new ShallowRenderer();

describe('<Login />', () => {
  let props;

  beforeEach(() => {
    props = {
      onGetAuthToken: jest.fn(),
    };
  });

  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(<Login {...props} />);
    expect(spy).not.toHaveBeenCalled();
  });

  it('Should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(<Login {...props} />);
    expect(firstChild).toMatchSnapshot();
  });

  describe('when google callback is called with a valid token', () => {
    const token = 'something';

    beforeEach(() => {
      const renderedOutput = renderer.render(<Login {...props} />);
      const googleLoginComponent = findWithType(renderedOutput, GoogleLogin);
      googleLoginComponent.props.onSuccess({ accessToken: token });
    });

    it('renders modal content', () => {
      expect(props.onGetAuthToken).toHaveBeenCalledWith(token);
    });
  });

  describe('when google callback is called with an error', () => {
    beforeEach(() => {
      const renderedOutput = renderer.render(<Login {...props} />);
      const googleLoginComponent = findWithType(renderedOutput, GoogleLogin);
      googleLoginComponent.props.onFailure({ error: 'something' });
    });

    it('renders modal content', () => {
      expect(props.onGetAuthToken).not.toHaveBeenCalled();
    });
  });
});
