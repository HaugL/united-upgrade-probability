import _ from 'underscore'

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
      const flightTime = row.children[2].children[0].children[0].innerHTML
      return {
        departure: {
          time: row.children[0].children[1].children[0].innerHTML,
          airport: departureAirport,
          airportCode: departureAirport.slice(departureAirport.length-4, departureAirport.length-1)
        },
        destination: {
          time: row.children[1].children[1].children[0].innerHTML,
          airport: destinationAirport,
          airportCode: destinationAirport.slice(destinationAirport.length-4, destinationAirport.length-1)
        },
        flightNumber: row.children[4].children[0].children[0].innerHTML,
        flightHours: (flightTime.indexOf('hr') > -1) ? parseInt(flightTime.split(' hr')[0]) : 0
      }
    });
  });

  const destinationFlightRows = _.uniq(flightRows.filter((row) => {
    return row.destination.airportCode === destination && row.flightHours > 5;
  }), (flight) => {
    return flight.flightNumber
  });

  console.log(destinationFlightRows);
  console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
}


const getAirlineCodeFromTimetableRow = (loc) => {loc.slice(loc.length-4, loc.length-1)}
const timeout = (ms) => new Promise(resolve => setTimeout(resolve, ms));
