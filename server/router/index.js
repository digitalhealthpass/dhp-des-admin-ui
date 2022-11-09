/**
 * Digital Health Pass 
 *
 * (c) Copyright Merative US L.P. and others 2020-2022 
 *
 * SPDX-Licence-Identifier: Apache 2.0
 */

const express = require('express');

const checkAuth = require('../middleware/checkAuth');
const authHandler = require('../handlers/auth');
const uploadHander = require('../handlers/upload');
const statusHander = require('../handlers/status');

const multer = require('multer');
const storage = multer.diskStorage({
	filename: function (req, file, cb) {
		cb(null, file.originalname)
	}
})
const upload = multer({ storage: storage })

const router = express.Router();

// proxy to the auth APIs
router.post('/login', authHandler.login);
router.get('/logout', authHandler.logout);
router.get('/user_attributes', authHandler.attributes);

router.post('/registration', checkAuth, upload.single('file'), uploadHander.registration);
router.post('/results', checkAuth, upload.single('file'), uploadHander.results);

router.get('/status/:org/:role', checkAuth, statusHander.status);

module.exports = router;
