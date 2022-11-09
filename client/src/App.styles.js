/**
 * Digital Health Pass 
 *
 * (c) Copyright Merative US L.P. and others 2020-2022 
 *
 * SPDX-Licence-Identifier: Apache 2.0
 */

import styled from 'styled-components';
import { white } from '@carbon/themes';

const { ui01 } = white;

const Header = styled.div`
  display: flex;
  flex: 0 0 auto;
  height: auto;
`;

const MainContent = styled.div`
  display: flex;
  flex: 1 1 auto;
  background-color: ${ui01};
  flex-direction: column;
  overflow: hidden;
`;

const S = {
	Header,
	MainContent
};

export default S;