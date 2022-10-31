'use strict';

const Event = require('events');
const { data } = require('./system');
const event = new Event();

event.on('new-flight', (flightDetails) => {
  console.log(` Manager : new flight with ID ${flightDetails.id} have been scheduled`);
  data(flightDetails, 'new-flight');
});

event.on('took-off', (flightDetails) => {
  console.log(`Pilot : flight with ID ${flightDetails.id} took-off`);
  data(flightDetails, 'took-off');
});

event.on('arrived', (flightDetails) => {
  console.log(`Pilot : flight with ID ${flightDetails.id} has arrived`);
  data(flightDetails, 'arrived');
});

module.exports = event;