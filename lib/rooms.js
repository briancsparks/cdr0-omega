

let unique = 0;
let rooms = {};

const Room = function(name, options ={}) {
  let self = this;

  self.id           = ++unique;
  self.name         = name || `room${self.id}`;                     /* computer friendly name */
  self.title        = options.title               || '';            /* human friendly name */
  self.namespace    = options.namespace           || null;

  self.users        = {};
  self.sockets      = {};

  rooms[self.name]  = this;

  // ------------------------------------------------------------------------------------------------------------------
  self.addSocket    = function (socket, options ={}) {
    const socketId          = socket.id;
    let   {username}        = (socket.handshake && socket.handshake.query) || {};

    username  = username || `socket_${socket.id}`;

    let   resultSocket  = self.sockets[socketId];
    if (!resultSocket) {
      resultSocket = self.sockets[socketId] = socket;
    }

    if (username) {
      self.users[username] = resultSocket;
    }

    resultSocket.join(self.name);

    return resultSocket;
  }

  // ------------------------------------------------------------------------------------------------------------------
  self.removeSocket = function(socket) {
    socket.leave(self.name);

    const username = usernameForSocket(socket);
    if (username) {
      delete self.users[username];
    }

    delete self.sockets[socket.id];
  }

  // ------------------------------------------------------------------------------------------------------------------
  self.sendData  = function (data) {

  };

  // ------------------------------------------------------------------------------------------------------------------
  function usernameForSocket(socket) {
    const usernames = Object.keys(self.users);
    for (let i = 0; i < usernames.length; i+=1) {
      const username = usernames[i];
      if (self.users[username].id === socket.id) {
        return username;
      }
    }
  }

};

module.exports.rooms = rooms;
module.exports.Room  = Room;
