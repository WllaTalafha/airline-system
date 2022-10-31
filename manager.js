'use strict';

const { v4: uuidv4 } = require('uuid');
const { faker } = require('@faker-js/faker');
const { takeFlight } = require('./pilot');
const event = require('./events');

setInterval(() => {
  let flightDetails = {
    id: uuidv4(),
    pilot: faker.name.fullName(),
    destination: faker.address.country(),
    time: faker.date.future()
  }
  event.emit('new-flight', flightDetails);
  takeFlight(flightDetails);
  event.once('arrived', () => {    
    console.log(`Manager: we are greatly thankful for the amazing flight`);
  })
}, 10000);
