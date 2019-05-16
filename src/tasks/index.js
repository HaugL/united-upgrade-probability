// import { getBookshelf } from '../utils/database';
import { scrapeRoutes } from './scrape_routes'
import { closeConnection } from '../utils/database'

desc('Scrape routes'); // eslint-disable-line
task('scrape_routes', function () { // eslint-disable-line
  scrapeRoutes();

  // closeConnection();
});

desc('Scrape upgrade data for relevant routes departing within 30 minutes'); // eslint-disable-line
task('scrape_upgrades', function () { // eslint-disable-line
  closeConnection();
});
