//Globals
const body = document.querySelector('body');
const menu = document.querySelector('.menu-icon-link');
const feed = document.querySelector('.feed');
const entry = document.querySelector('.entry');
const feedly = document.querySelectorAll('.feed .entry');
const feedAndChild = document.querySelectorAll('.feed .entry');
const firstFeed = [];
const feedOne = [];
const feedTwo = [];


/* feedreader.js
 *
 * This is the spec file for Jasmine to read and contains
 * all of the tests ran against the application.
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
// From Udacity Starter Code:
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* Write a test that loops through each feed
         * in the allFeeds object and ensures it
         has a URL defined
          * and that the
         URL is not empty.
         */

       it('Is URL defined and not empty?', function() {
         for(let feed of allFeeds) {
           expect(feed.url).toBeDefined();
           expect(feed.url.length).not.toBeNull();
         }
       });


        /* Write a test that loops through each feed
         * in the allFeeds object and ensures it
         has a name defined
          * and that the
         name is not empty.
         */


         it('Is name defined and not empty?', function() {
           for(let feed of allFeeds) {
             expect(feed.name).toBeDefined();
             expect(feed.name.length).not.toBeNull();
          }
         });

});  // closes describe('RSS Feeds', function()


    /* Write a new test suite named "The menu" */

describe('The Menu', function() {

        /* Write a test that ensures the
        menu element is hidden by default.
         You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */

         it('Is menu hidden?', function() {
             expect(body.classList.contains('menu-hidden')).toBe(true);
         });


         /* Write a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */

          it('Does menu toggle?', function() {
            menu.click();
              expect(body.classList.contains('menu-hidden')).toBe(false);  // menu open
            menu.click();
              expect(body.classList.contains('menu-hidden')).toBe(true);  // menu closed
          });



}); // closes describe('The Menu', function() {


    /* Write a new test suite named "Initial Entries" */

describe('Initial Entries', function() {

        /* Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */

         beforeEach(function(done) {  // In the beforeEach function, we call loadFeed() for the first index, 0. (Courtesy of Matthew Cranford Walkthrough)
           loadFeed(0, done);
         });

         it('Is LoadFeed function complete?', function() {
           expect(feedAndChild.length).toBeGreaterThan(0); // change per review #1
        //  expect(feed.children.length).toBeGreaterThanOrEqual(1);
         });


}); // closes describe('Initial Entries', function() {

    /* Write a new test suite named "New Feed Selection" */

describe('New Feed Selection', function() {

        /* Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */

        /* beforeEach(function(done) {  //  (Courtesy of Matthew Cranford Walkthrough)
           loadFeed(0);
           Array.from(feed.children).forEach(function(entry) {
             firstFeed.push(entry.textContent);
           });
           console.log(feed.children[0].textContent);
           loadFeed(1, done);
         });*/

      /*   beforeEach(function(done) {  // Per review #1 suggestion
           loadFeed(0, function() {  // feed 0 done loading
           prevUrl = ...

          loadFeed(1, function(){  // feed 1 done loading
          newUrl = ...// all variables initialized, can begin tests

          done();
          });
          });
          }); */

  // Changes per review #1 - A huge thank you to Jason Michael White for the help with this!!!
  // Establishes DOM elements and empty arrays for later testing. -

// As per spec, `done` is passed as an argument to the `beforeEach` function
beforeEach(function(done) {
    //loads the first feed and executes a function to push each article to `feedOne` array
    loadFeed(0, function() {
        Array.from(feed.children).forEach(function(feed) {
            // console.log(feed);
            feedOne.push(feed.innerText);
            // loads the second feed and executes a function to push each article to the `feedTwo` array
            loadFeed(1, function() {
                Array.from(feed.children).forEach(function(feed) {
                    feedTwo.push(feed.innerText);
                });
                // executes `done()` function to cease asynchronous operation and signal that processing has completed
                done();
            });
        });
    });
});

         it('Does feed content change?', function() {
           Array.from(feed.children).forEach(function(entry,index) {
             console.log(entry.textContent , firstFeed[index], entry.textContent  === firstFeed[index]);
             expect(entry.textContent  === firstFeed[index]).toBe(false);
           });
         });

}); // closes describe('New Feed Selection', function() {

}()); // closes $(function()
