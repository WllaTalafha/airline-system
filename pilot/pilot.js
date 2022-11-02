'use strict';

require('dotenv').config();

const socket = require('socket.io-client');

const pilot_hub = socket.connect(process.env.GLOBAL_HUB_URL);
const pilot_airline = socket.connect(process.env.AIRLINE_HUB_URL);

pilot_hub.on('took-off', (payload) => {
  setTimeout(() => {
    console.log(`Pilot: flight with ID '${payload.Details.flightID}' took-off`);
    payload.event = 'took-off';
    payload.time = new Date()
    pilot_airline.emit('tookOffNotify', payload);
  }, 4000);
});

pilot_hub.on('arrived',(payload) => {
  setTimeout(() => {
    console.log(`Pilot: flight with ID '${payload.Details.flightID}' arrived`);
    payload.event = 'arrived';
    payload.time = new Date();
    pilot_hub.emit('arrivedNotify', payload);
  }, 3000);
});