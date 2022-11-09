/**
 * Digital Health Pass 
 *
 * (c) Copyright Merative US L.P. and others 2020-2022 
 *
 * SPDX-Licence-Identifier: Apache 2.0
 */


// Pre-flight check to ensure that the accessToken cookie exists before 
// allowing the request to continue through the chain of middlewares.  
// If it doesn't exist, then a 403 response is returned and the request is not passed through
const checkAuth = async (request, response, next) => {
    const accessToken = request.cookies ? request.cookies.accessTokenGH : '';

    if (accessToken) {
        response.locals.accessToken = accessToken;

        next();
    } else {
        response.status(403).send({ message: 'Forbidden Resource', status: 403 });
    }
};

module.exports = checkAuth;
