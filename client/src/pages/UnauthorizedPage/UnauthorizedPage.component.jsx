/**
 * Digital Health Pass 
 *
 * (c) Copyright Merative US L.P. and others 2020-2022 
 *
 * SPDX-Licence-Identifier: Apache 2.0
 */

import React from 'react';
import { useTranslation } from 'react-i18next';
import StyledUnauthorizedPage from './UnauthorizedPage.styles';

const UnauthorizedPage = () => {
  const { t } = useTranslation();
  const UNAUTHORIZED_PAGE = t('nls.UNAUTHORIZED_PAGE.message');

  return <StyledUnauthorizedPage>{UNAUTHORIZED_PAGE}</StyledUnauthorizedPage>;
};

export default UnauthorizedPage;
