/**
 * Digital Health Pass 
 *
 * (c) Copyright Merative US L.P. and others 2020-2022 
 *
 * SPDX-Licence-Identifier: Apache 2.0
 */

/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import { Route } from 'react-router-dom';
import LoginPage from '../pages/LoginPage/LoginPage';
import { useAuth } from '../hooks/useAuth';
import UnauthorizedPage from '../pages/UnauthorizedPage/UnauthorizedPage.component';

const ProtectedRoute = ({ component: Component, allowedRoles, ...rest }) => {
  const auth = useAuth();
  const { user, login } = auth;
  const { authenticated, roles } = user;

  const userIsAuthorized = roles.some((userRole) => allowedRoles.indexOf(userRole) >= 0);

  const [success, setSuccess] = useState();
  const [attempts, setAttempts] = useState(0);

  const handleLogin = async (email, password) => {
    const result = await login({ email, password });
    if (result) {
      setAttempts(0);
    } else {
      setAttempts(attempts + 1);
    }

    setSuccess(result);
  };

  return (
    <Route
      {...rest}
      render={(props) => (
        <>
          {!authenticated && (
            <LoginPage
              onLoginCallback={handleLogin}
              error={success === false}
            />
          )}

          {authenticated && userIsAuthorized && <Component {...props} />}
          {authenticated && !userIsAuthorized && <UnauthorizedPage />}
        </>
      )}
    />
  );
};

export default ProtectedRoute;
