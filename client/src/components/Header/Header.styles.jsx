/**
 * Digital Health Pass 
 *
 * (c) Copyright Merative US L.P. and others 2020-2022 
 *
 * SPDX-Licence-Identifier: Apache 2.0
 */

import styled, { css } from 'styled-components';

import { Header } from 'carbon-components-react/lib/components/UIShell';

const StyledHeader = css`
  li._auto_logoutMenu {
    display: block;
    a.bx--header__menu-item.bx--header__menu-title:before {
      display: block;
      content: ' ';
      background-image: url('data:image/svg+xml;utf8,<svg version="1.1" id="icon" fill="white" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="16px" height="16px" viewBox="0 0 16 16" style="enable-background:new 0 0 16 16;" xml:space="preserve"><style type="text/css">.st0{fill:none;}</style><title>user</title><path d="M8,2c1.4,0,2.5,1.1,2.5,2.5S9.4,7,8,7S5.5,5.9,5.5,4.5S6.6,2,8,2 M8,1C6.1,1,4.5,2.6,4.5,4.5S6.1,8,8,8s3.5-1.6,3.5-3.5S9.9,1,8,1z"/><path d="M13,15h-1v-2.5c0-1.4-1.1-2.5-2.5-2.5h-3C5.1,10,4,11.1,4,12.5V15H3v-2.5C3,10.6,4.6,9,6.5,9h3c1.9,0,3.5,1.6,3.5,3.5V15z"/><rect id="_Transparent_Rectangle_" class="st0" width="16" height="16"/></svg>');
      background-size: 28px 28px;
      background-repeat: no-repeat;
      height: 28px;
      width: 28px;
      padding-right: 10px;
    }
  }
  li._auto_licenseMenu {
    display: block;
    a.bx--header__menu-item.bx--header__menu-title:before {
      display: block;
      content: ' ';
      background-image: url('data:image/svg+xml;utf8,<svg id="icon" fill="white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><defs><style>.cls-1{fill:none;}</style></defs><title>help</title><path d="M16,2A14,14,0,1,0,30,16,14,14,0,0,0,16,2Zm0,26A12,12,0,1,1,28,16,12,12,0,0,1,16,28Z"/><circle cx="16" cy="23.5" r="1.5"/><path d="M17,8H15.5A4.49,4.49,0,0,0,11,12.5V13h2v-.5A2.5,2.5,0,0,1,15.5,10H17a2.5,2.5,0,0,1,0,5H15v4.5h2V17a4.5,4.5,0,0,0,0-9Z"/><rect class="cls-1" width="16" height="16"/></svg>');
      background-size: 28px 28px;
      background-repeat: no-repeat;
      height: 28px;
      width: 28px;
      padding-right: 10px;
    }
  }
`;

const StyledHeaderWrapper = styled(Header)`
  ${StyledHeader}
  flex: 1 1 auto;
  position: relative;
`;

export default StyledHeaderWrapper;
