'use strict';

function data(flightDetails,eventName) {
  console.log(
    {
      event: eventName,
      time: new Date(),
      Details: {
        airLine: 'Royal Jordanian Airlines',
        flightID: flightDetails.id,
        pilot: flightDetails.pilot,
        destination: flightDetails.destination,
      }
    }
  )
}
module.exports = { data };