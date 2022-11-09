/**
 * Digital Health Pass 
 *
 * (c) Copyright Merative US L.P. and others 2020-2022 
 *
 * SPDX-Licence-Identifier: Apache 2.0
 */

import React, { useEffect, useState, useRef } from 'react';
import { Button, TextInput } from 'carbon-components-react';
import { ArrowRight16 } from '@carbon/icons-react';
import { useTranslation } from 'react-i18next';

import {
  StyledLoginPage,
  StyledLoginForm,
  StyledPageTitle,
  StyledErrorMessage,
} from './LoginPage.styles';

const Login = ({ onLogin, showError, attempts }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordType, setPasswordType] = useState('password');
  const [errMsg, setErrMsg] = useState();
  let btnRef = useRef();

  const { t } = useTranslation();
  const LOGIN = t('nls.LOGIN.login');
  const EMAIL = t('nls.LOGIN.email');
  const EMAIL_PLACEHOLDER = t('nls.LOGIN.email_placeholder');
  const PASSWORD = t('nls.LOGIN.password');
  const LOG_IN = t('nls.LOGIN.log_in');
  const LOGIN_FAILED = t('nls.LOGIN.login_failed');

  useEffect(() => {
    if (showError === true) {
      setErrMsg(LOGIN_FAILED);
      btnRef.current.setAttribute("disabled", "");
    }
  }, [showError, LOGIN_FAILED, attempts]);

  const onBtnClick = e => {
    if (btnRef.current) {
      btnRef.current.setAttribute("disabled", "disabled");
    }
    onLogin(email, password);
  }

  return (
    <StyledLoginPage>
      <StyledLoginForm>
        <div>
          <StyledPageTitle>{LOGIN}</StyledPageTitle>
        </div>
        <TextInput
          light
          id="email"
          labelText={EMAIL}
          placeholder={EMAIL_PLACEHOLDER}
          value={email}
          onChange={(event) => {
            event.preventDefault();
            setEmail(event.target.value.trim());
            setErrMsg(undefined);
          }}
        />
        <TextInput.ControlledPasswordInput
          light
          id="password"
          labelText={PASSWORD}
          type={passwordType}
          togglePasswordVisibility={() => {
            setPasswordType(passwordType === 'password' ? 'text' : 'password');
          }}
          value={password}
          onChange={(event) => {
            event.preventDefault();
            setPassword(event.target.value.trim());
            setErrMsg(undefined);
          }}
        />
        <StyledErrorMessage errMsg={errMsg}>{errMsg}</StyledErrorMessage>
        <Button
          renderIcon={ArrowRight16}
          ref={btnRef}
          onClick={onBtnClick}
        >
          {LOG_IN}
        </Button>
      </StyledLoginForm>
    </StyledLoginPage>
  );
};

export default Login;
