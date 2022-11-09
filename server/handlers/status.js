/**
 * Digital Health Pass 
 *
 * (c) Copyright Merative US L.P. and others 2020-2022 
 *
 * SPDX-Licence-Identifier: Apache 2.0
 */

const axios = require('../helpers/axiosClient');
const logger = require('../config/logger').getLogger('status-handler');

const batchStatus = async (request, response) => {
	try {
		const { startDate, endDate } = request.query;
		
		let dateQueryParam = '';
		if (startDate && endDate) {
			dateQueryParam = `&startDate=${startDate}&endDate=${endDate}`
		}

		const GET_BATCHES_URL = `/data/${request.params.org}/batches/report?role=${request.params.role}${dateQueryParam}`;
		const headers = { Authorization: `Bearer ${response.locals.accessToken}` }

		const { data, status } = await axios.getClient(request).get(GET_BATCHES_URL, headers);

		return response.status(status).send(data);
	} catch (error) {
		logger.error(error.message);
		return response.status(400).send({ message: error.message });
	}
};

exports.status = async (request, response) => batchStatus(request, response);