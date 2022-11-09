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

const StyledLogoutPage = styled.div`
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${ui03};

  .title{
    font-size: 3.375rem;
    font-weight: 300;
    line-height: 1.19;
    letter-spacing: 0;
    padding-bottom: 1rem;
  }
  .text1{
    font-size: 2rem;
    font-weight: 300;
    line-height: 1.19;
    letter-spacing: 0;
    padding-bottom: 1rem;
  }
  .text2{
    font-size: 1rem;
    font-weight: 300;
    line-height: 1.19;
    letter-spacing: 0;
  }
`;

export default StyledLogoutPage;
