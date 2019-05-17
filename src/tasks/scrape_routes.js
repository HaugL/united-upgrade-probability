import { Bookshelf } from '../utils/database';
import { Destination } from '../models/Destination';
import puppeteer from 'puppeteer';
import randomUA from 'modern-random-ua';
import {
  initial_search_timetable,
  get_flights,
  secondary_search_timetable
} from '../utils/united_timetables'

import { getTimezoneFromCity } from '../utils/timezone'

const timeout = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// export const scrapeRoutes = () => {
//
//   (async () => {
//     const destinations = await Destination.fetchAll();
//     for(let i = 0; i < destinations.models.length; i++){
//       const destination = destinations.models[i]
//       if(i === 0){
//
//       } else {
//
//       }
//       i += 1;
//     }
//   })();
// };

// export const scrapeRoutes = () => {
//   (async () => {
//     const x = await getTimezoneFromCity('New York/Newark, NJ, US', 'EWR')
//     console.log(x)
//   })();
// }

export const scrapeRoutes = () => {
  (async () => {
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    await page.setUserAgent("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.131 Safari/537.36");
    const destinations = await Destination.fetchAll();
    for(let i = 0; i < destinations.models.length; i++){
      const destination = destinations.models[i]
      const destinationAirport =  destination.get('airport_code');
      console.log("Airport: ",  destinationAirport);
      if(i === 0){
        console.log("Initial Search");
        await initial_search_timetable(page, destinationAirport);
      } else {
        console.log("Secondary Search");
        await secondary_search_timetable(page, destinationAirport);
      }
      await timeout(300);
      console.log("Getting Flights");
      await get_flights(page, destinationAirport);
      console.log("Pause....");
      await timeout(30000);
      i += 1;
    }
  })();
};

// const testFlights = [ { departure:
//      { time: '10:55 a.m.',
//        airport: 'San Francisco, CA, US (SFO)',
//        airportCode: 'SFO' },
//     destination:
//      { time: '2:20 p.m.',
//        airport: 'Beijing (PEK)',
//        airportCode: 'PEK' },
//     flightNumber: 'UA0888' },
//   { departure:
//      { time: '12:55 p.m.',
//        airport: 'Chicago, IL, US (ORD)',
//        airportCode: 'ORD' },
//     destination:
//      { time: '3:25 p.m.',
//        airport: 'Beijing (PEK)',
//        airportCode: 'PEK' },
//     flightNumber: 'UA0851' },
//   { departure:
//      { time: '10:55 a.m.',
//        airport: 'San Francisco, CA, US (SFO)',
//        airportCode: 'SFO' },
//     destination:
//      { time: '2:20 p.m.',
//        airport: 'Beijing (PEK)',
//        airportCode: 'PEK' },
//     flightNumber: 'UA0888' },
//   { departure:
//      { time: '12:55 p.m.',
//        airport: 'Chicago, IL, US (ORD)',
//        airportCode: 'ORD' },
//     destination:
//      { time: '3:25 p.m.',
//        airport: 'Beijing (PEK)',
//        airportCode: 'PEK' },
//     flightNumber: 'UA0851' },
//   { departure:
//      { time: '11:50 a.m.',
//        airport: 'New York/Newark, NJ, US (EWR)',
//        airportCode: 'EWR' },
//     destination:
//      { time: '1:35 p.m.',
//        airport: 'Beijing (PEK)',
//        airportCode: 'PEK' },
//     flightNumber: 'UA0089' },
//   { departure:
//      { time: '10:55 a.m.',
//        airport: 'San Francisco, CA, US (SFO)',
//        airportCode: 'SFO' },
//     destination:
//      { time: '2:20 p.m.',
//        airport: 'Beijing (PEK)',
//        airportCode: 'PEK' },
//     flightNumber: 'UA0888' },
//   { departure:
//      { time: '11:50 a.m.',
//        airport: 'New York/Newark, NJ, US (EWR)',
//        airportCode: 'EWR' },
//     destination:
//      { time: '1:35 p.m.',
//        airport: 'Beijing (PEK)',
//        airportCode: 'PEK' },
//     flightNumber: 'UA0089' },
//   { departure:
//      { time: '10:55 a.m.',
//        airport: 'San Francisco, CA, US (SFO)',
//        airportCode: 'SFO' },
//     destination:
//      { time: '2:20 p.m.',
//        airport: 'Beijing (PEK)',
//        airportCode: 'PEK' },
//     flightNumber: 'UA0888' },
//   { departure:
//      { time: '11:50 a.m.',
//        airport: 'New York/Newark, NJ, US (EWR)',
//        airportCode: 'EWR' },
//     destination:
//      { time: '1:35 p.m.',
//        airport: 'Beijing (PEK)',
//        airportCode: 'PEK' },
//     flightNumber: 'UA0089' },
//   { departure:
//      { time: '10:55 a.m.',
//        airport: 'San Francisco, CA, US (SFO)',
//        airportCode: 'SFO' },
//     destination:
//      { time: '2:20 p.m.',
//        airport: 'Beijing (PEK)',
//        airportCode: 'PEK' },
//     flightNumber: 'UA0888' },
//   { departure:
//      { time: '11:50 a.m.',
//        airport: 'New York/Newark, NJ, US (EWR)',
//        airportCode: 'EWR' },
//     destination:
//      { time: '1:35 p.m.',
//        airport: 'Beijing (PEK)',
//        airportCode: 'PEK' },
//     flightNumber: 'UA0089' },
//   { departure:
//      { time: '10:55 a.m.',
//        airport: 'San Francisco, CA, US (SFO)',
//        airportCode: 'SFO' },
//     destination:
//      { time: '2:20 p.m.',
//        airport: 'Beijing (PEK)',
//        airportCode: 'PEK' },
//     flightNumber: 'UA0888' },
//   { departure:
//      { time: '11:50 a.m.',
//        airport: 'New York/Newark, NJ, US (EWR)',
//        airportCode: 'EWR' },
//     destination:
//      { time: '1:35 p.m.',
//        airport: 'Beijing (PEK)',
//        airportCode: 'PEK' },
//     flightNumber: 'UA0089' },
//   { departure:
//      { time: '10:55 a.m.',
//        airport: 'San Francisco, CA, US (SFO)',
//        airportCode: 'SFO' },
//     destination:
//      { time: '2:20 p.m.',
//        airport: 'Beijing (PEK)',
//        airportCode: 'PEK' },
//     flightNumber: 'UA0888' },
//   { departure:
//      { time: '10:55 a.m.',
//        airport: 'San Francisco, CA, US (SFO)',
//        airportCode: 'SFO' },
//     destination:
//      { time: '2:20 p.m.',
//        airport: 'Beijing (PEK)',
//        airportCode: 'PEK' },
//     flightNumber: 'UA0888' },
//   { departure:
//      { time: '11:50 a.m.',
//        airport: 'New York/Newark, NJ, US (EWR)',
//        airportCode: 'EWR' },
//     destination:
//      { time: '1:35 p.m.',
//        airport: 'Beijing (PEK)',
//        airportCode: 'PEK' },
//     flightNumber: 'UA0089' },
//   { departure:
//      { time: '10:55 a.m.',
//        airport: 'San Francisco, CA, US (SFO)',
//        airportCode: 'SFO' },
//     destination:
//      { time: '2:20 p.m.',
//        airport: 'Beijing (PEK)',
//        airportCode: 'PEK' },
//     flightNumber: 'UA0888' },
//   { departure:
//      { time: '11:50 a.m.',
//        airport: 'New York/Newark, NJ, US (EWR)',
//        airportCode: 'EWR' },
//     destination:
//      { time: '1:35 p.m.',
//        airport: 'Beijing (PEK)',
//        airportCode: 'PEK' },
//     flightNumber: 'UA0089' },
//   { departure:
//      { time: '11:50 a.m.',
//        airport: 'New York/Newark, NJ, US (EWR)',
//        airportCode: 'EWR' },
//     destination:
//      { time: '1:35 p.m.',
//        airport: 'Beijing (PEK)',
//        airportCode: 'PEK' },
//     flightNumber: 'UA0089' },
//   { departure:
//      { time: '1:40 a.m.',
//        airport: 'Los Angeles, CA, US (LAX)',
//        airportCode: 'LAX' },
//     destination:
//      { time: '5:20 a.m.',
//        airport: 'Beijing (PEK)',
//        airportCode: 'PEK' },
//     flightNumber: 'UA7617' },
//   { departure:
//      { time: '11:30 a.m.',
//        airport: 'Los Angeles, CA, US (LAX)',
//        airportCode: 'LAX' },
//     destination:
//      { time: '3:10 p.m.',
//        airport: 'Beijing (PEK)',
//        airportCode: 'PEK' },
//     flightNumber: 'UA7588' },
//   { departure:
//      { time: '2:50 p.m.',
//        airport: 'San Francisco, CA, US (SFO)',
//        airportCode: 'SFO' },
//     destination:
//      { time: '5:55 p.m.',
//        airport: 'Beijing (PEK)',
//        airportCode: 'PEK' },
//     flightNumber: 'UA7615' },
//   { departure:
//      { time: '1:00 a.m.',
//        airport: 'Houston, TX, US (IAH)',
//        airportCode: 'IAH' },
//     destination:
//      { time: '4:50 a.m.',
//        airport: 'Beijing (PEK)',
//        airportCode: 'PEK' },
//     flightNumber: 'UA7476' },
//   { departure:
//      { time: '2:50 p.m.',
//        airport: 'San Francisco, CA, US (SFO)',
//        airportCode: 'SFO' },
//     destination:
//      { time: '5:55 p.m.',
//        airport: 'Beijing (PEK)',
//        airportCode: 'PEK' },
//     flightNumber: 'UA7615' },
//   { departure:
//      { time: '4:05 p.m.',
//        airport: 'Washington, DC, US (IAD)',
//        airportCode: 'IAD' },
//     destination:
//      { time: '6:05 p.m.',
//        airport: 'Beijing (PEK)',
//        airportCode: 'PEK' },
//     flightNumber: 'UA7609' },
//   { departure:
//      { time: '2:20 p.m.',
//        airport: 'Los Angeles, CA, US (LAX)',
//        airportCode: 'LAX' },
//     destination:
//      { time: '6:10 p.m.',
//        airport: 'Beijing (PEK)',
//        airportCode: 'PEK' },
//     flightNumber: 'UA7619' },
//   { departure:
//      { time: '11:30 a.m.',
//        airport: 'Los Angeles, CA, US (LAX)',
//        airportCode: 'LAX' },
//     destination:
//      { time: '3:10 p.m.',
//        airport: 'Beijing (PEK)',
//        airportCode: 'PEK' },
//     flightNumber: 'UA7588' },
//   { departure:
//      { time: '1:00 a.m.',
//        airport: 'Houston, TX, US (IAH)',
//        airportCode: 'IAH' },
//     destination:
//      { time: '4:50 a.m.',
//        airport: 'Beijing (PEK)',
//        airportCode: 'PEK' },
//     flightNumber: 'UA7476' },
//   { departure:
//      { time: '2:20 p.m.',
//        airport: 'Los Angeles, CA, US (LAX)',
//        airportCode: 'LAX' },
//     destination:
//      { time: '6:10 p.m.',
//        airport: 'Beijing (PEK)',
//        airportCode: 'PEK' },
//     flightNumber: 'UA7619' },
//   { departure:
//      { time: '2:50 p.m.',
//        airport: 'San Francisco, CA, US (SFO)',
//        airportCode: 'SFO' },
//     destination:
//      { time: '5:55 p.m.',
//        airport: 'Beijing (PEK)',
//        airportCode: 'PEK' },
//     flightNumber: 'UA7615' },
//   { departure:
//      { time: '4:05 p.m.',
//        airport: 'Washington, DC, US (IAD)',
//        airportCode: 'IAD' },
//     destination:
//      { time: '6:05 p.m.',
//        airport: 'Beijing (PEK)',
//        airportCode: 'PEK' },
//     flightNumber: 'UA7609' },
//   { departure:
//      { time: '1:40 a.m.',
//        airport: 'Los Angeles, CA, US (LAX)',
//        airportCode: 'LAX' },
//     destination:
//      { time: '5:20 a.m.',
//        airport: 'Beijing (PEK)',
//        airportCode: 'PEK' },
//     flightNumber: 'UA7617' },
//   { departure:
//      { time: '1:00 a.m.',
//        airport: 'Houston, TX, US (IAH)',
//        airportCode: 'IAH' },
//     destination:
//      { time: '4:50 a.m.',
//        airport: 'Beijing (PEK)',
//        airportCode: 'PEK' },
//     flightNumber: 'UA7476' },
//   { departure:
//      { time: '2:50 p.m.',
//        airport: 'San Francisco, CA, US (SFO)',
//        airportCode: 'SFO' },
//     destination:
//      { time: '5:55 p.m.',
//        airport: 'Beijing (PEK)',
//        airportCode: 'PEK' },
//     flightNumber: 'UA7615' },
//   { departure:
//      { time: '1:40 a.m.',
//        airport: 'Los Angeles, CA, US (LAX)',
//        airportCode: 'LAX' },
//     destination:
//      { time: '5:20 a.m.',
//        airport: 'Beijing (PEK)',
//        airportCode: 'PEK' },
//     flightNumber: 'UA7617' },
//   { departure:
//      { time: '2:20 p.m.',
//        airport: 'Los Angeles, CA, US (LAX)',
//        airportCode: 'LAX' },
//     destination:
//      { time: '6:10 p.m.',
//        airport: 'Beijing (PEK)',
//        airportCode: 'PEK' },
//     flightNumber: 'UA7619' },
//   { departure:
//      { time: '1:00 a.m.',
//        airport: 'Houston, TX, US (IAH)',
//        airportCode: 'IAH' },
//     destination:
//      { time: '4:50 a.m.',
//        airport: 'Beijing (PEK)',
//        airportCode: 'PEK' },
//     flightNumber: 'UA7476' },
//   { departure:
//      { time: '1:40 a.m.',
//        airport: 'Los Angeles, CA, US (LAX)',
//        airportCode: 'LAX' },
//     destination:
//      { time: '5:20 a.m.',
//        airport: 'Beijing (PEK)',
//        airportCode: 'PEK' },
//     flightNumber: 'UA7617' },
//   { departure:
//      { time: '1:40 a.m.',
//        airport: 'Los Angeles, CA, US (LAX)',
//        airportCode: 'LAX' },
//     destination:
//      { time: '5:20 a.m.',
//        airport: 'Beijing (PEK)',
//        airportCode: 'PEK' },
//     flightNumber: 'UA7617' },
//   { departure:
//      { time: '1:00 a.m.',
//        airport: 'Houston, TX, US (IAH)',
//        airportCode: 'IAH' },
//     destination:
//      { time: '4:50 a.m.',
//        airport: 'Beijing (PEK)',
//        airportCode: 'PEK' },
//     flightNumber: 'UA7476' },
//   { departure:
//      { time: '1:40 a.m.',
//        airport: 'Los Angeles, CA, US (LAX)',
//        airportCode: 'LAX' },
//     destination:
//      { time: '5:20 a.m.',
//        airport: 'Beijing (PEK)',
//        airportCode: 'PEK' },
//     flightNumber: 'UA7617' },
//   { departure:
//      { time: '1:00 a.m.',
//        airport: 'Houston, TX, US (IAH)',
//        airportCode: 'IAH' },
//     destination:
//      { time: '4:50 a.m.',
//        airport: 'Beijing (PEK)',
//        airportCode: 'PEK' },
//     flightNumber: 'UA7476' },
//   { departure:
//      { time: '1:00 a.m.',
//        airport: 'Houston, TX, US (IAH)',
//        airportCode: 'IAH' },
//     destination:
//      { time: '4:50 a.m.',
//        airport: 'Beijing (PEK)',
//        airportCode: 'PEK' },
//     flightNumber: 'UA7476' },
//   { departure:
//      { time: '1:00 a.m.',
//        airport: 'Houston, TX, US (IAH)',
//        airportCode: 'IAH' },
//     destination:
//      { time: '4:50 a.m.',
//        airport: 'Beijing (PEK)',
//        airportCode: 'PEK' },
//     flightNumber: 'UA7476' },
//   { departure:
//      { time: '11:30 p.m.',
//        airport: 'Honolulu, HI, US (HNL)',
//        airportCode: 'HNL' },
//     destination:
//      { time: '4:55 a.m.',
//        airport: 'Beijing (PEK)',
//        airportCode: 'PEK' },
//     flightNumber: 'UA7594' },
//   { departure:
//      { time: '1:40 a.m.',
//        airport: 'Los Angeles, CA, US (LAX)',
//        airportCode: 'LAX' },
//     destination:
//      { time: '5:20 a.m.',
//        airport: 'Beijing (PEK)',
//        airportCode: 'PEK' },
//     flightNumber: 'UA7617' },
//   { departure:
//      { time: '1:00 a.m.',
//        airport: 'Houston, TX, US (IAH)',
//        airportCode: 'IAH' },
//     destination:
//      { time: '4:50 a.m.',
//        airport: 'Beijing (PEK)',
//        airportCode: 'PEK' },
//     flightNumber: 'UA7476' },
//   { departure:
//      { time: '1:40 a.m.',
//        airport: 'Los Angeles, CA, US (LAX)',
//        airportCode: 'LAX' },
//     destination:
//      { time: '5:20 a.m.',
//        airport: 'Beijing (PEK)',
//        airportCode: 'PEK' },
//     flightNumber: 'UA7617' },
//   { departure:
//      { time: '1:00 a.m.',
//        airport: 'Houston, TX, US (IAH)',
//        airportCode: 'IAH' },
//     destination:
//      { time: '4:50 a.m.',
//        airport: 'Beijing (PEK)',
//        airportCode: 'PEK' },
//     flightNumber: 'UA7476' },
//   { departure:
//      { time: '1:40 a.m.',
//        airport: 'Los Angeles, CA, US (LAX)',
//        airportCode: 'LAX' },
//     destination:
//      { time: '5:20 a.m.',
//        airport: 'Beijing (PEK)',
//        airportCode: 'PEK' },
//     flightNumber: 'UA7617' } ]
