/**
 * Digital Health Pass 
 *
 * (c) Copyright Merative US L.P. and others 2020-2022 
 *
 * SPDX-Licence-Identifier: Apache 2.0
 */

import {
	HeaderGlobalBar, HeaderMenu,
	HeaderMenuItem,
	HeaderName
} from 'carbon-components-react/lib/components/UIShell';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

import StyledHeaderWrapper from './Header.styles';

const AppHeader = () => {
  const history = useHistory();

  const { t } = useTranslation();
  const HEADERSTRING = t('nls.HEADER.app_name');
  const LOGOUT = t('nls.HEADER.logout');

  const auth = useAuth();
  const { user, logout } = auth;
  const { authenticated, userName } = user;

  const handleLogout = async () => {
    logout();
    history.push('/');
  };

  return (
    <StyledHeaderWrapper aria-label={HEADERSTRING}>
      <HeaderName prefix="">{HEADERSTRING}</HeaderName>

      <HeaderGlobalBar>
        {
          // Don't show the logout link with the userName until we have the userName
          authenticated && (
            <HeaderMenu
              className="_auto_logoutMenu"
              menuLinkName={userName}
              aria-label={userName}
            >
              <HeaderMenuItem aria-label={LOGOUT} className="_auto_logout" onClick={handleLogout} onKeyPress={handleLogout}>
                {LOGOUT}
              </HeaderMenuItem>
            </HeaderMenu>
          )
        }
      </HeaderGlobalBar>
    </StyledHeaderWrapper>
  );
};

export default AppHeader;
