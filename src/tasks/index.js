import { test } from '../utils/database';

desc('Scrape routes');
task('scrape_routes', function () {
  console.log("HI");
});

desc('Scrape upgrade data for relevant routes departing within 30 minutes');
task('scrape_upgrades', function (a, b, c) {
  console.log('SCRAPE');
});


desc('Scrape upgrade data for relevant routes departing within 30 minutes');
task('default', function (a, b, c) {
  console.log('SCRAPE');
});
