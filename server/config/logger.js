/**
 * Digital Health Pass 
 *
 * (c) Copyright Merative US L.P. and others 2020-2022 
 *
 * SPDX-Licence-Identifier: Apache 2.0
 */

const log4js = require('log4js');
const config = require('./index');

log4js.configure({
    appenders: {
        out: {
            type: 'console',
            layout: {
                type: 'pattern',
                pattern: '%[[%d] [%p] [%X{txnid}] %c%] %m',
            }
        },
    },
    categories: {
        default: { appenders: ['out'], level: config.log.level },
    },
});

function getLogger(module, txnid = '') {
    const logger = log4js.getLogger(module);
    logger.addContext('txnid', txnid);
    logger.level = config.log.level;
    return logger;
}

module.exports = {
    getLogger,
};

