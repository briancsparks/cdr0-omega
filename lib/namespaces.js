
const {Room}                  = require('./rooms');

let unique = 0;
let namespaces = {};

const Namespace = function(name, options ={}) {
  let self = this;

  self.id           = ++unique;
  self.name         = name || `ns${self.id}`;                       /* computer friendly name */
  self.title        = options.title               || '';            /* human friendly name */
  self.endpoint     = options.endpoint;

  self.rooms = {};

  self.joinRoom = function(roomish, socket, options ={}) {
    let [room, roomname] = self.resolveRoom(roomish, options) ||[];

    if (!room) {
      if (roomname) {
        const room_ = new Room(roomname, {...options, namespace: self});
        self.addRoom(room_, roomname, options);
      } else {
        // TODO: What?  !room and !roomname, just make one up?
        // return self.joinRoom(`make something up`, socket, options);
      }
    }

    if (room) {
      room.addSocket(socket);
    }
  };

  self.addRoom = function(room, roomname, options ={}) {
    return (self.rooms[roomname] = room);
  };

  // ------------------------------------------------------------------------------------------------------------------
  // Returns a Room object, if it is in self.rooms
  self.resolveRoom = function(roomish, options ={}) {
    if (typeof roomish === "string") {
      // Fetch an existing room, if present
      if (roomish in self.rooms) {
        return [self.rooms[roomish], roomish];
      }

      // otherwise, we only have the name
      return [null, roomish];
    }

    if (roomish instanceof Room) {
      const roomname = roomish.name;
      if (roomname in self.rooms) {
        return [self.rooms[roomname], roomname];
      }

      const room = self.addRoom(roomish, roomname, options);
      return [room, roomname];
    }
  };

  // listen

};

module.exports.namespaces = namespaces;
module.exports.Namespace  = Namespace;
