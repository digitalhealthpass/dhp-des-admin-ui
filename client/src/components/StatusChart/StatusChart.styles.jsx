/**
 * Digital Health Pass 
 *
 * (c) Copyright Merative US L.P. and others 2020-2022 
 *
 * SPDX-Licence-Identifier: Apache 2.0
 */

import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: ${(props) => props.width || 200}px;
  min-width: ${(props) => props.width || 200}px;
  height: ${(props) => props.height || 48}px;
  line-height: ${(props) => props.height || 48}px;
`;

const Chart = styled.div`
  display: flex;
  width: inherit;
  height: ${(props) => props.height};
  line-height: ${(props) => props.height};
`;

const Stats = styled.div`
  width: inherit;
  display: inline-flex;
  justify-content: flex-end;

  span, a {
    font-size: 13px;
    font-weight: 400;
    line-height: 1.29;
    letter-spacing: 0.16px;
    margin: 0.3rem;
  }

  a {
    cursor: pointer;
  }
`;

const Bar = styled.div`
  background-color: ${(props) => props.color};
  height: inherit;
  width: ${(props) => props.percentage}%;
  color: white;
  text-align: center;
  vertical-align: middle;
  line-height: inherit;
`;

const S = {
  Container,
  Chart,
  Stats,
  Bar
};

export default S;

