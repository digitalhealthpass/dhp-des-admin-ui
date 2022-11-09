/**
 * Digital Health Pass 
 *
 * (c) Copyright Merative US L.P. and others 2020-2022 
 *
 * SPDX-Licence-Identifier: Apache 2.0
 */

import React, { useState, useContext, createContext } from 'react';
import { login as appLogin, logout as appLogout, getOrgs } from '../services/dataService';

// create a context
const authContext = createContext();

// Provider a wrapper component for the app so auth context is available to all children
const ProvideAuth = ({ children }) => {
  const initialState = {
    authenticated: false,
    userName: '',
    scope: [],
    orgs: [],
    roles: [],
    currentRole: '',
    currentOrg: ''
  };

  const [user, setUser] = useState(initialState);

  const login = async ({ email, password }) => {

    const ORG_INDEX = 0;
    const ROLE_INDEX = 1;

    const getValueFromScope = (scope, location) => {
      const getRelevantScopes = (scope) => {
        return scope.filter(
          (role) => role.includes('regadmin') || role.includes('testadmin')
        );
      };

      const relevantScopes = getRelevantScopes(scope);

      const valueArray = relevantScopes.reduce((acc, value) => {
        const val = value.split('.')[location];
        if (!acc.includes(val)) {
          acc.push(val);
        }
        return acc;
      }, []);

      return valueArray;
    };

    try {
      const { status, data } = await appLogin(email, password);

      if (status === 201) {
        const scopeArray = data.scope.split(' ') || [];

        // follow old scheme to get the orgs from the scope
        let orgs = getValueFromScope(scopeArray, ORG_INDEX).sort() || [];
        const roles = getValueFromScope(scopeArray, ROLE_INDEX).sort() || [];

        // follow new scheme to get the orgs from the custom attribute
        if (orgs.length === 1 && orgs[0] === 'des') {
          const { data } = await getOrgs();
          orgs = [data.org] || []
        }

        setUser({
          authenticated: true,
          userName: email,
          scope: scopeArray,
          orgs,
          roles,
          currentOrg: orgs.length === 1 ? orgs[0] : undefined,
          currentRole: roles[0]
        });
        return true;
      }
    } catch (e) {
      return false;
    }
  };

  const logout = async () => {
    const response = await appLogout();

    if (response.status === 200) {
      setUser(initialState);
    }
  };

  return (
    <authContext.Provider
      value={{
        user,
        setUser,
        login,
        logout,
      }}
    >
      {children}
    </authContext.Provider>
  );
};

export default React.memo(ProvideAuth);

// Provide a convenience hook for children that uses the authContext
export const useAuth = () => useContext(authContext);
