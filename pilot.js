'use strict';

const event = require('./events');

function takeFlight(flightDetails) {
  setTimeout(() => {
    event.emit('took-off', flightDetails);    
  }, 4000);
  arrived(flightDetails);
}

function arrived(flightDetails) {
  setTimeout(() => {
    event.emit('arrived', flightDetails);
  }, 7000);
}
module.exports = { takeFlight };