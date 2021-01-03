
require('dotenv').config()

const express                 = require('express');
const app                     = express();
// const socketio                = require('socket.io')
const getPort                 = require('./polyrepo/cdr0-ports');
const configure               = require('./polyrepo/cdr0-configured')(module);
const omegaServerPort         = getPort('omega_server').port;

app.use(express.static(__dirname + '/public'));

const expressServer   = app.listen(omegaServerPort, () => {
  console.log(`Listening on ${omegaServerPort}`);
});

const cardi0    = configure('cdr0-socket-io', require('./lib/cdr0-socket-io'), expressServer);

// const io              = socketio(expressServer);

// // io.on = io.of('/').on
// io.on('connection', (socket) => {
//   // NOTE: See the bottom of this file to see what members `socket` has.
//
//   // console.log("Someone connected to the main namespace", {socket});
//   console.log(`${socket.id} connected to the main namespace.`);
//
//   socket.emit('ctrl', {data: "Welcome to the Omega socketio server"});   /* messageFromServer */
//
//   socket.on('messageToServer', (dataFromClient) => {
//     console.log({dataFromClient});
//   });
//
//   // A data message -- re-send to other clients
//   socket.on('data', (data) => {
//     io.of('/').emit('data', data);
//   });
//
//   // socket.on('newMessageToServer',(msg)=>{
//   //   // console.log(msg)
//   //   // io.emit('messageToClients',{text:msg.text})
//   //   io.of('/').emit('messageToClients',{text:msg.text})
//   // })
//
//   // The server can still communicate across namespaces
//   // but on the clientInformation, the socket needs be in THAT namespace
//   // in order to get the events
//
//   setTimeout(()=>{
//     io.of('/admin').emit('welcome',"Welcome to the admin channel, from the main channel!")
//   },2000)
//
//
//
// })
//
// io.of('/admin').on('connection', (socket) => {
//   // console.log("Someone connected to the admin namespace!", {socket});
//   console.log(`${socket.id} connected to the admin namespace.`);
//
//   // Shouldnt it be socket.emit(...)
//   io.of('/admin').emit('welcome',"Welcome to the Omega admin channel!");
// })



// socket.id:           'MGB7VrF-NZq3qhv-AAAA'
// socket.nsp.name: '/'
// socket.nsp.sockets: {}    ???
// socket.server:nsps
// socket.server.path: '/socket.io'
// socket.client.id:    'MGB7VrF-NZq3qhv-AAAA'
// socket.client.server
// socket.client.sockets
// socket.client.nsps
// socket.conn.id:      'MGB7VrF-NZq3qhv-AAAA'
// socket.conn.server
// socket.conn.upgrading  .upgraded
// socket.conn.readyState: 'open'
// socket.conn.remoteAddress:         '::1'
// socket.rooms
// socket.connected  .disconnected
// socket.handshake
//    .headers  (Object)
//    .time  (String)
//    .address ('::1')
//    .xdomain (false)
//    .secure (false)
//    .url: '/socket.io/?username=larry  ...
//    .query

