
const socketio                = require('socket.io')

module.exports.cardi0 = {};
let cardi0 = module.exports.cardi0;

let rooms = {
  root: {
    sockets: {},
    users: {}
  },
};

module.exports.configure = function(config) {
  const {expressServer}   = config;
  cardi0.expressServer    = expressServer;

  const io                = socketio(expressServer);
  cardi0.io               = io;

  cardi0.sendToRoom = function(room, data) {
    io.of('/').emit('data', data);
  };

// io.on = io.of('/').on
  io.on('connection', (socket) => {
    // NOTE: See the bottom of this file to see what members `socket` has.

    const username = (socket.handshake.query && socket.handshake.query.username) || socket.id;

    // console.log("Someone connected to the main namespace", {socket});
    console.log(`${socket.id} connected to the main namespace (${username}).`);

    rooms.root.sockets[socket.id]   = socket;
    rooms.root.users[username]      = socket;

    socket.emit('ctrl', {data: "Welcome to the Omega socketio server"});   /* messageFromServer */

    socket.on('messageToServer', (dataFromClient) => {
      console.log({dataFromClient});
    });

    // A data message -- re-send to other clients
    socket.on('data', (data) => {
      io.of('/').emit('data', data);
    });

    // socket.on('newMessageToServer',(msg)=>{
    //   // console.log(msg)
    //   // io.emit('messageToClients',{text:msg.text})
    //   io.of('/').emit('messageToClients',{text:msg.text})
    // })

    // The server can still communicate across namespaces
    // but on the clientInformation, the socket needs be in THAT namespace
    // in order to get the events

    setTimeout(()=>{
      io.of('/admin').emit('welcome',"Welcome to the admin channel, from the main channel!")
    },2000)



  })

  io.of('/admin').on('connection', (socket) => {
    // console.log("Someone connected to the admin namespace!", {socket});
    console.log(`${socket.id} connected to the admin namespace.`);

    // Shouldnt it be socket.emit(...)
    io.of('/admin').emit('welcome',"Welcome to the Omega admin channel!");
  })

};

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


