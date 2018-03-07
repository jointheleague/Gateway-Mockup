describe("basic navigation", function() {
	const pauseTime = 500;
	const waitTime = 5000;
	const waitTimeLong = 20000;

	/*before(function() {
		server.call("generateFixtures");
	});*/

	it("can go to the root", function() {
		browser.url("http://localhost:3000");
		const loginForm = browser.elements("form.accounts-ui");

		assert.equal(browser.getText("div.page-header"), "Project Gateway");
	});

	it("can go to the About page", function() {
		browser.url("http://localhost:3000/about");
		assert.equal(browser.getText("h2"), "About");
	});

	it("can go to the Jobs page", function() {
		browser.url("http://localhost:3000/jobs");
		assert.equal(browser.getText("h2#pageTitle"), "Job Listings");
	});
});
