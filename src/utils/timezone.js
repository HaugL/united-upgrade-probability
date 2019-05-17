import { TimezoneMap } from '../models/TimezoneMap';

const googleMapsClient = require('@google/maps').createClient({
  key: process.env.GOOGLE_API_KEY,
  Promise: Promise
});

export const getTimezoneFromCity = (city, airportCode) => {
  return new Promise( (resolve, reject) => {
    TimezoneMap.where('airport_code', '=', airportCode).fetch().then(function(codeMap) {
      if(codeMap === null){
        TimezoneMap.where('city', '=', city).fetch().then(function(cityMap) {
            if(cityMap === null){
              getCoordinatesFromCity(city)
              .then((coordinates) => {
                getTimezoneFromCoordinates(coordinates)
              .then((timezoneId) => {
                TimezoneMap.forge({
                  airport_code: airportCode,
                  city: city,
                  timezone: timezoneId
                }).save()
              .then((newMap) => {
                resolve(newMap.get('timezone'))
              })})})
            } else {
              resolve(cityMap.get('timezone'))
            }
        })
      } else {
        resolve(codeMap.get('timezone'))
      }
    })
  })
}

const getCoordinatesFromCity = (city) => {
  return new Promise( (resolve, reject) => {
    googleMapsClient.geocode({ address: city })
    .asPromise()
    .then((response) => {
      resolve(response.json.results[0].geometry.location);
    })
    .catch((err) => {
      console.log(err);
      reject(err)
    });
  })
}

const getTimezoneFromCoordinates = (coordinates) => {
  return new Promise( (resolve, reject) => {
    googleMapsClient.timezone({
      location: [coordinates.lat, coordinates.lng],
      language: 'en',
    })
    .asPromise()
    .then(function(response) {
      resolve(response.json.timeZoneId)
    })
    .catch((err) => {
      console.log(err);
      reject(err)
    });
  })
}
