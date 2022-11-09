/**
 * Digital Health Pass 
 *
 * (c) Copyright Merative US L.P. and others 2020-2022 
 *
 * SPDX-Licence-Identifier: Apache 2.0
 */

import axios from 'axios';
import { v4 as uuid } from 'uuid';

import { LOGOUT_URL, LOGIN_URL, REGISTRATION_URL, RESULT_URL, STATUS_URL, CUSTOM_ATTRS_URL } from '../constants/paths';
import { REQUEST_HEADERS } from '../constants/network';

axios.interceptors.request.use(
	(request) => {
		const txId = uuid(); // generate a UUID for this transaction

		request.headers[REQUEST_HEADERS.TRANSACTION_ID] = txId;
		document.body.classList.add('loading-indicator');

		console.log(`[${txId}] - ${request.method} ${request.url}`)

		return request
	},
	(error) => {
		return Promise.reject(error);
	}
);

axios.interceptors.response.use(
	(response) => {
		document.body.classList.remove('loading-indicator');
		const txID = response.config.headers[REQUEST_HEADERS.TRANSACTION_ID];

		console.log(`[${txID}] - ${response.status}`)

		return response
	},
	(error) => {
		const txID = error?.response?.config?.headers[REQUEST_HEADERS.TRANSACTION_ID] || 'unknown';
		const message = error?.response?.status || 'unknown';
		console.error(`[${txID}] - ${message}`)

		document.body.classList.remove('loading-indicator');
		
		return Promise.reject(error);
	}
);

export const login = async (email, password) => await axios.post(LOGIN_URL, { email, password }, { withCredentials: true });
export const logout = async () => await axios.get(LOGOUT_URL, { withCredentials: true });
export const getOrgs = async () => await axios.get(CUSTOM_ATTRS_URL, { withCredentials: true })

export const uploadRegistration = async (form, config) => await axios.post(REGISTRATION_URL, form, config);
export const uploadResult = async (form, config) => await axios.post(RESULT_URL, form, config);
export const getStatus = async (currentOrg, currentRole, queryParam) => await axios.get(`${STATUS_URL}/${currentOrg}/${currentRole}${queryParam}`, { withCredentials: true })