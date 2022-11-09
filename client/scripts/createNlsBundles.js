/**
 * Digital Health Pass 
 *
 * (c) Copyright Merative US L.P. and others 2020-2022 
 *
 * SPDX-Licence-Identifier: Apache 2.0
 */

const fs = require('fs');
const path = require('path');

const _ = require('lodash');

const SOURCE_PATH = './src';
const TARGET_PATH = './public/locales';

const SOURCE_NAME = 'strings.json';
const TARGET_NAME = 'translation.json';

/**
 * Main
 * 1) Read all of the nls directories in all modules.  Each module will contain its own bundle of strings.
 * 2) An nls directory will have a subdirectory for each language (e.g. 'en', 'es', 'de', etc.) with a strings.json file.
 * 3) Build up a single JSON object for *each* language. Make a hashmap with each key being the language identifier (e.g. 'en', 'es', etc.).
 * 4) Write out a JSON file for each language to the target path (iterate through the map that was created above).
 */
console.log('createNlsBundles...');
findFiles(SOURCE_PATH, isNlsFile, processFiles);

/**
 * Find files in dir that satisfy matches function and invoke the callback when finished
 * @param {string} dir - path to recursively search for matching files
 * @param {any} matches - function matches(filename: string): boolean
 * @param {any} callback - function callback(err:NodeJS.ErrnoException, results:Array<string>)
 */
function findFiles(dir, matches, callback) {
	let results = [];

	fs.readdir(dir, function (err, list) {
		if (err) return callback(err);

		var count = list.length;

		if (!count) return callback(null, results);

		list.forEach(function (file) {
			file = path.resolve(dir, file);
			fs.stat(file, function (err, stats) {
				// If directory, execute a recursive call
				if (stats && stats.isDirectory()) {
					findFiles(file, matches, function (err, sublist) {
						results = results.concat(sublist);
						if (!--count) callback(null, results);
					});
				} else {
					if (matches(file)) {
						results.push(file);
					}
					if (!--count) callback(null, results);
				}
			});
		});
	});
}

/**
 * Process all the files (used as a callback function for findFiles)
 * @param {NodeJS.ErrnoException} err
 * @param {Array<string>} files
 */
function processFiles(err, files) {
	let langMap = {};
	if (err) {
		throw err;
	}
	files.sort().forEach((file) => {
		console.log(`processing file: ${file}`);
		langMap = processFile(file, langMap);
	});
	createBundles(langMap);
	console.log(`Done.`);
}

/**
 * Process a single file
 * Add the strings from the file to the proper place in the langMap
 * @param {string} filePath
 * @param {object} langMap
 */
function processFile(filePath, langMap) {
	// For each file, process the contents and add it to a map
	// The map is:
	//     key = language ID (ex: en)
	//     value = map of modules to their translated content
	const langId = getLangId(filePath);

	if (langId) {
		var langObj = langMap[langId];
		if (!langObj) {
			langObj = {};
			langMap[langId] = langObj;
		}

		try {
			// Read the NLS file and take the first key in the file and treat it as the module name
			var bundleObj = JSON.parse(fs.readFileSync(filePath, 'utf8'));
			var moduleName = Object.keys(bundleObj)[0];

			// Add the contents of the module name NLS values to existing contents or create a new one
			var curModuleBundle = langObj[moduleName] ? langObj[moduleName] : {};
			langObj[moduleName] = extend(curModuleBundle, bundleObj[moduleName]);
		} catch (e) {
			console.error('ERROR: createNlsBundles');
			console.error(filePath);
			throw e;
		}
	}
	return langMap;
}

/**
 * Tests if a file is an nls file
 * @param {string} filePath
 * @returns true if the filePath is an nls file
 */
function isNlsFile(filePath) {
	return !!getLangId(filePath);
}

/**
 * Given a path to an nls file, return the langId ('en', 'pt-BR', etc)
 * This assumes the files are named .../nls/en/strings.json
 * @param {string} filePath - path of a file with a langId
 */
function getLangId(filePath) {
	let langId;
	var pathParts = filePath.split(path.sep);
	if (
		pathParts &&
		pathParts.length > 3 &&
		pathParts[pathParts.length - 3] === 'nls' &&
		pathParts[pathParts.length - 1] === SOURCE_NAME
	) {
		langId = pathParts[pathParts.length - 2];
	}
	return langId;
}

/**
 * General purpose function for extending one object's properties from another's.
 * @param {*} obj1
 * @param {*} obj2
 */
var extend = function (obj1, obj2) {
	return _.merge({}, obj1, obj2);
};

/**
 * Given a langMap, write out the nls bundles
 * @param {object} langMap
 */
function createBundles(langMap) {
	// Write each language file to disk.
	for (var langId in langMap) {
		if (langMap.hasOwnProperty(langId)) {
			const dirName = `${TARGET_PATH}/${langId}`;
			const fileName = `${dirName}/${TARGET_NAME}`;
			// make the diectory if it doesn't exist
			fs.mkdirSync(dirName, { recursive: true });
			console.log(`About to write ${fileName}`);
			fs.writeFileSync(fileName, JSON.stringify({ nls: langMap[langId] }));
		}
	}
}
