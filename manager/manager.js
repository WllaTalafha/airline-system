'use strict';

require('dotenv').config();
const { v4: uuidv4 } = require('uuid');
const { faker } = require('@faker-js/faker');

const socket = require('socket.io-client');

const manager = socket.connect(process.env.GLOBAL_HUB_URL);

manager.on('new-flight', () => {
  setInterval(() => {
    const newFlight = {
      event: 'new-flight',
      time: new Date(),
      Details: {
        airLine: 'Royal Jordanian Airlines',
        flightID: uuidv4(),
        pilot: faker.name.fullName(),
        destination: faker.address.country()
      }
    }
    console.log(`Manager: new flight with ID '${newFlight.Details.flightID}' have been scheduled`);
    manager.emit('newFlightNotify', newFlight);
  }, 10000);
});

manager.on('thankful', (payload) => {
  console.log(`Manager: we're greatly thankful for the amazing flight, '${payload.Details.pilot}'`);
})