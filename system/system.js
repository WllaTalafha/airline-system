'use strict';

const socket_io = require('socket.io');
require('dotenv').config();
const hub = socket_io(process.env.HUB);
const airline = hub.of('/airline');

hub.on('connection', (clientSocket) => {
  clientSocket.emit('new-flight');
  clientSocket.on('newFlightNotify', (payload) => {
    console.log('Flight', flightData(payload));
    hub.emit('took-off', flightData(payload));
  });  

  clientSocket.on('arrivedNotify', (payload) => {
    console.log('Flight', flightData(payload));
    hub.emit('thankful', flightData(payload));
  })
});

airline.on('connection', (clientSocket) => {
  clientSocket.on('tookOffNotify', (payload) => {
    console.log('Flight', flightData(payload));
    hub.emit('arrived', flightData(payload));
  });
});

function flightData (payload){
  const flightData = {
    event: payload.event,
    time: payload.time,
    Details: {
      airLine: 'Royal Jordanian Airlines',
      flightID: payload.Details.flightID,
      pilot: payload.Details.pilot,
      destination: payload.Details.destination
    }
  }
  return flightData;
}