/* feedreader.js
 *
 * This is the spec file for Jasmine to read and contains
 * all of the tests ran against the application.
 */

/* All of our tests are placed within the $() function,
 * since some of these tests may require DOM elements,
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* First test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* First test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty.
         */
// From Udacity Starter Code:
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* Loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */

       it('Is URL defined and not empty?', function() {
         for(let feed of allFeeds) {
           expect(feed.url).toBeDefined();
           expect(feed.url.length).not.toBeNull();
         }
       });


        /* Loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */

         it('Is name defined and not empty?', function() {
           for(let feed of allFeeds) {
             expect(feed.name).toBeDefined();
             expect(feed.name.length).not.toBeNull();
          }
         });

});  // closes describe('RSS Feeds', function()


    /* New test suite named "The menu" */

describe('The Menu', function() {

        /* Test that ensures the menu element is hidden by default.*/

         it('Is menu hidden?', function() {
           const body = document.querySelector('body');
             expect(body.classList.contains('menu-hidden')).toBe(true);
         });


         /* Test that ensures the menu changes
          * visibility when the menu icon is clicked.
          */

          it('Does menu toggle?', function() {
            const body = document.querySelector('body');
            const menu = document.querySelector('.menu-icon-link');
              menu.click();
                expect(body.classList.contains('menu-hidden')).toBe(false);  // menu open
              menu.click();
                expect(body.classList.contains('menu-hidden')).toBe(true);  // menu closed
          });

}); // closes describe('The Menu', function() {


    /* New test suite named "Initial Entries" */

describe('Initial Entries', function() {

        /* Test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         */

         beforeEach(function(done) {  // In the beforeEach function, we call loadFeed() for the first index, 0. (Courtesy of Matthew Cranford Walkthrough)
           loadFeed(0, done);
         });

         it('Is LoadFeed function complete?', function() {
           const feedly = document.querySelectorAll('.feed .entry');

         expect(feedly.length).toBeGreaterThan(0); // change per review #1
      //  expect(feed.children.length).toBeGreaterThanOrEqual(1);
       });


}); // closes describe('Initial Entries', function() {

    /* New test suite named "New Feed Selection" */

describe('New Feed Selection', function() {
  const feed = document.querySelector('.feed');
  const firstFeed = [];

        /* Test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
        */

        /* beforeEach(function(done) {  //  (Courtesy of Matthew Cranford Walkthrough)
           loadFeed(0);
           Array.from(feed.children).forEach(function(entry) {
             firstFeed.push(entry.textContent);
           });
           console.log(feed.children[0].textContent);
           loadFeed(1, done);
         });*/


  // Changes per review #1 - A huge thank you to Jason Michael White for the help with this!!!
  // Establishes DOM elements and empty arrays for later testing. -

// As per spec, `done` is passed as an argument to the `beforeEach` function
beforeEach(function(done) {
  const feed = document.querySelector('.feed');
  const feedOne = [];
  const feedTwo = [];
    //loads the first feed and executes a function to push each article to `feedOne` array
    loadFeed(0, function() {
        Array.from(feed.children).forEach(function(feed) {
            // console.log(feed);
            feedOne.push(feed.innerHTML);  // Revised per review #2.
            // loads the second feed and executes a function to push each article to the `feedTwo` array
            loadFeed(1, function() {
                Array.from(feed.children).forEach(function(feed) {
                    feedTwo.push(feed.innerHTML);  // Revised per review #2.
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
