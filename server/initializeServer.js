/**
 * Digital Health Pass 
 *
 * (c) Copyright Merative US L.P. and others 2020-2022 
 *
 * SPDX-Licence-Identifier: Apache 2.0
 */

const path = require('path');
const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const noCache = require('nocache');
const compression = require('compression');

exports.initializeServer = (router) => {
    const app = express();
    const isProduction = process.env.NODE_ENV !== 'development';
    const corsConfig = isProduction ? { origin: false } : { origin: 'http://localhost:3000', credentials: true };
    app.set('trust proxy', 1);
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.use(cookieParser());

    app.use(cors(corsConfig));
    app.use(noCache());
    app.use(helmet.referrerPolicy({ policy: 'same-origin' }));
    app.use(
        helmet.contentSecurityPolicy({
            directives: {
                defaultSrc: ["'self'"],
                imgSrc: ["'self'", 'data:'],
                styleSrc: ["'self'", "'unsafe-inline'"],
                objectSrc: ["'none'"],
                fontSrc: [
                    "'self'",
                    'https://fonts.gstatic.com/s/ibmplexmono/',
                    'https://fonts.gstatic.com/s/ibmplexsans/',
                ],
                workerSrc: ["'self'", 'blob:'],
            },
        })
    );
    app.use(helmet.frameguard({ action: 'sameorigin' }));
    app.use(helmet.hsts());
    app.use(helmet.noSniff());
    app.use(helmet.xssFilter());
    app.use(compression());

    const CONTEXT_ROOT = isProduction ? '' : '/datasubmission';
    
    // Set up express router to serve all api routes
    app.use(`${CONTEXT_ROOT}/api`, router);

    // Serve all static files from the ../client folder  - this is not used during development
    const clientPath = path.join(__dirname, '../client')
    app.use(`${CONTEXT_ROOT}/`, express.static(clientPath));

    return app;
};
