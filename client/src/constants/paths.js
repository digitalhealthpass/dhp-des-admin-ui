/**
 * Digital Health Pass 
 *
 * (c) Copyright Merative US L.P. and others 2020-2022 
 *
 * SPDX-Licence-Identifier: Apache 2.0
 */

// NOTE:for production, SERVER is '' which makes the urls relative, thus allowing the router in the server to handle the request
// for dev, SERVER is typically 'http://localhost:5000' or whever the Server Node Express instance is running
// Note: create-react-app prefixes commandline environment variables with `REACT_APP_` by default. https://create-react-app.dev/docs/adding-custom-environment-variables/
export const SERVER_ROOT = '/datasubmission';

export const LOGIN_URL = `${SERVER_ROOT}/api/login`;
export const LOGOUT_URL = `${SERVER_ROOT}/api/logout`;
export const CUSTOM_ATTRS_URL = `${SERVER_ROOT}/api/user_attributes`;

export const UNAUTH_PATH = `${SERVER_ROOT}/unauthorized`;

export const REGISTRATION_URL = `${SERVER_ROOT}/api/registration`;
export const RESULT_URL = `${SERVER_ROOT}/api/results`;
export const STATUS_URL = `${SERVER_ROOT}/api/status`;