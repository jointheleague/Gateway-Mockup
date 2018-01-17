describe("basic navigation", function() {
	const pauseTime = 500;
	const waitTime = 5000;
	const waitTimeLong = 20000;

	/*before(function() {
		server.call("generateFixtures");
	});*/

	it("can try to go to the root", function() {
		browser.url("http://localhost:3000");
		const loginForm = browser.elements("form.accounts-ui");

		assert.equal(browser.getText("div.page-header"), "Project Gateway");
	});
});
