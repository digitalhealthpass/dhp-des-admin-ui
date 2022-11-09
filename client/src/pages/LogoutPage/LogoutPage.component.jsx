/**
 * Digital Health Pass 
 *
 * (c) Copyright Merative US L.P. and others 2020-2022 
 *
 * SPDX-Licence-Identifier: Apache 2.0
 */

import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import StyledLogoutPage from './LogoutPage.styles';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const LogoutPage = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const { logout } = useAuth();

  const [timer, setTimer] = useState(10);

  useEffect(() => {
    if (timer >= 1) {
      setTimeout(() => { setTimer(timer - 1) }, 1000)
    } else {
      logout().finally(() => {
        history.push('/');
      });
    }
  })

  return <>
    <StyledLogoutPage>
      <div className="text1">{t('nls.LOGOUT_PAGE.message1')}</div>
      <div className="text2">{t('nls.LOGOUT_PAGE.message2', { timer })}</div>
    </StyledLogoutPage>
  </>;
};

export default LogoutPage;
