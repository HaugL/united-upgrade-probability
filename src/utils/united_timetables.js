import _ from 'underscore'
import { Route } from '../models/Route'
import moment from 'moment'
import { getTimezoneFromCity } from '../utils/timezone'

export async function initial_search_timetable(page, destination){
  await page.goto('https://www.united.com/web/en-US/apps/travel/timetable/', {waitUntil: 'networkidle0'})
  // Enter Origin
  await page.focus('#ctl00_ContentInfo_OandD_Origin_txtOrigin')
  await page.keyboard.type(process.env.START_AIRPORT)
  await timeout(300)
  // Enter Destination
  await page.focus('#ctl00_ContentInfo_OandD_Destination_txtDestination')
  await page.keyboard.type(destination)
  await timeout(300);
  await click_search(page);
}

export async function secondary_search_timetable(page, destination){
  await page.evaluate(() => {
    document.querySelector('#ctl00_ContentInfo_Destination1_txtDestination').value = ''
  })
  await timeout(300)
  await page.focus('#ctl00_ContentInfo_Destination1_txtDestination')
  await page.keyboard.type(destination)
  await timeout(300)
  await click_search(page);
}

async function click_search(page){
  await page.focus('#ctl00_ContentInfo_searchbutton')
  // Click Search
  await page.evaluate(() => {
    const btn = document.querySelector("#ctl00_ContentInfo_searchbutton")
    btn.click();
  });
  await timeout(300);
  await page.waitForSelector('#ctl00_ContentInfo_lblOrigin');
}

export async function get_flights(page, destination){

  await page.waitForSelector('#ctl00_ContentInfo_lblOrigin');

  // Get flight information off of page
  let flightRows = await page.evaluate(() => {
    const rows = Array.from(document.querySelectorAll('.timetableResults .tdSegmentBlock table tr'))
      .filter((row) => row.children.length === 5);

    return rows.map((row) => {
      const departureAirport = row.children[0].children[2].innerHTML;
      const destinationAirport = row.children[1].children[2].innerHTML;
      const flightTime = row.children[2].children[0].children[0]
      return {
        departure: {
          time: row.children[0].children[1].children[0].innerHTML,
          city: departureAirport,
          airportCode: departureAirport.slice(departureAirport.length-4, departureAirport.length-1)
        },
        destination: {
          time: row.children[1].children[1].children[0].innerHTML,
          city: destinationAirport,
          airportCode: destinationAirport.slice(destinationAirport.length-4, destinationAirport.length-1)
        },
        flightNumber: row.children[4].children[0].children[0].innerHTML,
        flightHours: !flightTime ? 100 : (flightTime.innerHTML.indexOf('hr') > -1) ? parseInt(flightTime.innerHTML.split(' hr')[0]) : 0
      }
    });
  });

  const destinationFlightRows = _.uniq(flightRows.filter((row) => {
    return row.destination.airportCode === destination && row.flightHours > 5;
  }), (flight) => {
    return flight.flightNumber
  });

  for(let index = 0; index < destinationFlightRows.length; index++){
    const dest = destinationFlightRows[index]
    const timezone = await getTimezoneFromCity(dest.departure.city, dest.departure.airportCode)
    const timeString = moment(dest.departure.time, 'h:mm a').format('H:mm');
    const existingRoute = await Route.where({
      flight_number: dest.flightNumber,
      departure_time_string: timeString ,
      from: dest.departure.airportCode
    }).fetch()

    if(existingRoute === null){
      Route.forge({
        flight_number: dest.flightNumber,
        from: dest.departure.airportCode,
        to: dest.destination.airportCode,
        departure_time_string: timeString,
        departure_timezone: timezone
      }).save()
    } else {
      console.log("Route already exists")
    }
  }

}


const getAirlineCodeFromTimetableRow = (loc) => {loc.slice(loc.length-4, loc.length-1)}
const timeout = (ms) => new Promise(resolve => setTimeout(resolve, ms));
