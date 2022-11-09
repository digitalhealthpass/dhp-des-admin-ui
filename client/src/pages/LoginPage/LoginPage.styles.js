/**
 * Digital Health Pass 
 *
 * (c) Copyright Merative US L.P. and others 2020-2022 
 *
 * SPDX-Licence-Identifier: Apache 2.0
 */

import styled from 'styled-components';
import { g100 } from '@carbon/themes';

const { support01, ui05, ui01 } = g100;

const LoginPage = styled.div`
	 background-color: ${ui01};
	 display: flex;
	 flex: 1 1 auto;
	 justify-content: space-between;
	 align-items: flex-start;
	 color: ${ui05};
	 height: 100%;
 
	 .idSection+.passwordSection {
		 margin-top: 1rem;
	 }
 
	 .bx--label {
		 color: ${ui05};
	 }
 
	 button {
		 width: 100%;
	 }
 `;

const LoginSideImg = styled.div`
	 display: flex;
	 flex: 1 1 auto;
	 height:inherit;
	 flex:70%;
	 background-image: url(${props => props.img});
	 background-size: contain;
	 background-repeat: no-repeat;
	 margin-left: -8rem;
 `;

const LoginSideForm = styled.div`
	 display: flex;
	 flex: 1 1 auto;
	 flex-direction: column;
	 height:inherit;
	 flex: 20%;
	 margin-left: 80px;
	 margin-top: 80px;
	 z-index: 1;

	 button {
		 max-width: none;
	 }
 
	 .forgotpw {
		 justify-content: flex-end;
		 &:hover{
			 color: #0f62fe;
			 background-color: #0000;
			 outline: none;
		 }
		 &:focus {
			 border: none;
			 box-shadow: none;
		 }
	 }
 `;

const LoginForm = styled.form`
	 max-width: 300px;
	 min-width: 300px;
 `;

const PageTitle = styled.h2`
	 font-weight: 400;
	 letter-spacing: 0;
	 margin-bottom: 4rem;
 `;

const ErrorMessageSection = styled.div`
		 max-height: ${props => props.show === true ? '5rem' : '0rem'};
		 transition: ${props => props.show === true ? 'max-height 0.3s ease-in' : 'max-height 0.3s ease-out'};
 `;

const ErrorMessage = styled.div`
	 padding: 2rem 0rem;
	 color: ${support01};
 `;

const S = {
	LoginPage,
	LoginSideImg,
	LoginSideForm,
	PageTitle,
	LoginForm,
	ErrorMessage,
	ErrorMessageSection
};

export default S;
