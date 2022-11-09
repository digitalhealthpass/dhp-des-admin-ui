/**
 * Digital Health Pass 
 *
 * (c) Copyright Merative US L.P. and others 2020-2022 
 *
 * SPDX-Licence-Identifier: Apache 2.0
 */

import styled from 'styled-components';
import { white } from '@carbon/themes';

const { ui03 } = white;

const StyledUnauthorizedPage = styled.div`
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${ui03};
`;

export default StyledUnauthorizedPage;
