/**
 * Digital Health Pass 
 *
 * (c) Copyright Merative US L.P. and others 2020-2022 
 *
 * SPDX-Licence-Identifier: Apache 2.0
 */

const axios = require('../helpers/axiosClient');
const logger = require('../config/logger').getLogger('upload-handler');

const FormData = require('form-data');
const fs = require('fs');

const REGISTRATION_URL = `/onboarding/mfa/users/file`;
const RESULT_URL = `/data/upload/file`;

function sleep(ms) {
	return new Promise((resolve) => {
		setTimeout(resolve, ms);
	});
}

const fileUpload = async (request, response, url, role) => {
	try {
		const organization = request.body.organization || "";

		// construct formData to send in request
		const formData = new FormData();
		formData.append('organization', organization);
		formData.append('file', fs.createReadStream(request.file.path));

		const headers = {
				...formData.getHeaders(),
		}

		// make the request to the API, get back the status and data
		const client = axios.getClient(request, headers);

		const { status, data } = await client.post(url, formData);
		
		const { batchID } = data;
		if (status === 200) {
			await sleep(5000);

			const GET_BATCH = `/data/${organization}/batches/${batchID}/report?role=${role}`;
			const { status, data } = await client.get(GET_BATCH);

			if (status === 200) {
				return response.status(status).send(data.payload);
			} else {
				logger.error(`Failed to retrieve status of previously submitted batch`);
			}
		}
	} catch (error) {
		if (error.response.status === 400) {
			// indicates file failed because it was invalid - pass this on to the UI for error processing
			return response.status(error.response.status).send(error.response.data.error);
		}

		logger.error(error.message);
		return response.status(error.response.status).send({ message: error.message });
	}
}

exports.registration = async (request, response) => {
	const role = 'regadmin';

	return fileUpload(request, response, REGISTRATION_URL, role)
};

exports.results = async (request, response) => {
	const role = 'testadmin';

	return fileUpload(request, response, RESULT_URL, role)
};
