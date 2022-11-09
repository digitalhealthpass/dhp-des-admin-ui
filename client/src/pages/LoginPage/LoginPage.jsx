/**
 * Digital Health Pass 
 *
 * (c) Copyright Merative US L.P. and others 2020-2022 
 *
 * SPDX-Licence-Identifier: Apache 2.0
 */

import React, { useState, useCallback, useRef, memo } from 'react';
import { Button, TextInput } from 'carbon-components-react';
import { ArrowRight16 } from '@carbon/icons-react';
import { useTranslation } from 'react-i18next';
import background from './background.jpg'

import S from './LoginPage.styles';

const LoginPage = ({ error, onLoginCallback, onForgotPWCallback }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordType, setPasswordType] = useState('password');
  const btnRef = useRef();

  const { t } = useTranslation();
  const LOGIN = t('nls.LOGIN.login');
  const EMAIL = t('nls.LOGIN.email');
  const EMAIL_PLACEHOLDER = t('nls.LOGIN.email_placeholder');
  const PASSWORD_PLACEHOLDER = t('nls.LOGIN.password_placeholder');
  const PASSWORD = t('nls.LOGIN.password');
  const LOG_IN = t('nls.LOGIN.log_in');
  const INVALID_LOGIN = t('nls.LOGIN.invalid_auth')

  const onSubmitHandler = async () => {
    if (btnRef.current) {
      btnRef.current.setAttribute('disabled', 'disabled');
    }
    onLoginCallback(email, password);
  }

  const onEmailChange = useCallback((event) => {
    event.preventDefault();
    btnRef.current.removeAttribute('disabled');
    setEmail(event.target.value.trim());
  }, [])

  const onPasswordChange = useCallback((event) => {
    event.preventDefault();
    btnRef.current.removeAttribute('disabled');
    setPassword(event.target.value.trim());
  }, [])

  const onForgotPW = useCallback(() => {
    if (email) {
      onForgotPWCallback(email);
    } else {

    }
  }, [email, onForgotPWCallback])

  return (
    <S.LoginPage className="login-page login-page-dark">
      <S.LoginSideForm className="login-sideform">

        <S.LoginForm className="login-form">
          <div>
            <S.PageTitle>{LOGIN}</S.PageTitle>
          </div>
          <div className="idSection">
            <TextInput
              id="email"
              labelText={EMAIL}
              placeholder={EMAIL_PLACEHOLDER}
              value={email}
              autoComplete="username"
              onChange={onEmailChange}
            />
          </div>
          <div className="passwordSection">
            <TextInput.ControlledPasswordInput
              id="password"
              labelText={PASSWORD}
              placeholder={PASSWORD_PLACEHOLDER}
              type={passwordType}
              togglePasswordVisibility={() => {
                setPasswordType(passwordType === 'password' ? 'text' : 'password');
              }}
              value={password}
              autoComplete="current-password"
              onChange={onPasswordChange}
            />
          </div>
          <S.ErrorMessageSection show={error}>
            <S.ErrorMessage>{INVALID_LOGIN}</S.ErrorMessage>
          </S.ErrorMessageSection>
          <Button renderIcon={ArrowRight16} ref={btnRef} type={'button'} onClick={onSubmitHandler}>
            {LOG_IN}
          </Button>
          {onForgotPWCallback && <Button className="forgotpw" kind="ghost" onClick={onForgotPW}>Forgot password?</Button>}
        </S.LoginForm>


      </S.LoginSideForm>
      <S.LoginSideImg img={background} className="login-sideImg"></S.LoginSideImg>
    </S.LoginPage>
  );
};

export default memo(LoginPage);
