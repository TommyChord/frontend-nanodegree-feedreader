/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
	/* This is our first test suite - a test suite just contains
	 * a related set of tests. This suite is all about the RSS
	 * feeds definitions, the allFeeds variable in our application.
	 */
	describe('RSS Feeds', function() {
		/* This is our first test - it tests to make sure that the
		 * allFeeds variable has been defined and that it is not
		 * empty. Experiment with this before you get started on
		 * the rest of this project. What happens when you change
		 * allFeeds in app.js to be an empty array and refresh the
		 * page?
		 */
		it('are defined', function() {
			expect(allFeeds).toBeDefined();
			expect(allFeeds.length).not.toBe(0);
		});


		/* Loop through each feed in the allFeeds object and ensures
		 * it has a URL defined and that the URL is not empty.
		 */
		it('have urls defined', function() {
			var result = false;
			allFeeds.forEach(function(feed){
				expect(feed.url).toBeDefined();
				expect(feed.url.length).not.toBe(0);
			});
		});

		/* Loop through each feed in the allFeeds object and ensures
		 * it has a name defined and that the name is not empty.
		 */
		it('have names defined', function() {
			var result = false;
			allFeeds.forEach(function(feed){
				expect(feed.name).toBeDefined();
				expect(feed.name.length).not.toBe(0);
			});
		});

	});

	/* Write a new test suite named "The menu" */
	describe('The menu', function() {

		/* Ensures the menu element is hidden by default.
		 */
		it('is hidden by default', function() {
			expect($("body").hasClass("menu-hidden")).toBeTruthy();

		});

		/* Ensures the menu changes visibility when the menu icon is clicked.
		 * This test has two expectations: the menu display when clicked and
		 * hide when clicked again.
		 */
		it('is toggled by click', function() {
			$(".menu-icon-link").click();
			expect($("body").hasClass("menu-hidden")).not.toBeTruthy();
			$(".menu-icon-link").click();
			expect($("body").hasClass("menu-hidden")).toBeTruthy();
		});
	});

	/* Write a new test suite named "Initial Entries" */
	describe('Initial Entries', function() {
		/* Ensures when the loadFeed function is called and completes its work,
		 * there is at least a single .entry element within the .feed container.
		 */
		beforeEach(function(done) {
			loadFeed(0, function() {
				done();
			})
		});

		// When the load is complete, count the entries and compare to 0
		it('are present', function(done) {
			var entries = $(".feed .entry").length;
			expect(entries).not.toEqual(0);
			done();
		});
	});

	/* Write a new test suite named "New Feed Selection"*/
	describe('New Feed Selection', function() {
		/* Write a test that ensures when a new feed is loaded
		 * by the loadFeed function that the content actually changes.
		 */
		var oldContent = '';
		var newContent = '';

		// Initial load with ID=0 (Udacity Blog) and store content.
		// When completed, load again with ID=2 (HTML5 Rocks)
		beforeEach(function(done) {
			loadFeed(0, function() {
				oldContent = $(".feed").html();
			})
			loadFeed(2, function() {
				newContent = $(".feed").html();
				done();
			})
		});

		// Run the test when the load is complete.
		it('content changes', function(done) {
			expect(newContent).not.toEqual(oldContent);
			done();
		});

	});
}());