"use strict";

module.exports = {
	seleniumStandaloneOptions: {
		// check for more recent versions of selenium here:
		// http://selenium-release.storage.googleapis.com/index.html
		version: "3.4.0",
		baseURL: "https://selenium-release.storage.googleapis.com",
		drivers: {
			chrome: {
				// check for more recent versions of chrome driver here:
				// http://chromedriver.storage.googleapis.com/index.html
				version: "2.29",
				arch: process.arch,
				baseURL: "https://chromedriver.storage.googleapis.com"
			}
		}
	},
	screenshotsOnError: true,
	mochaConfig: {
		timeout: 90000
	}
};
