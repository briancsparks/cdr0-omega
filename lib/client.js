
require('dotenv').config()

const CONFIG                  = require('../polyrepo/cdr0-config').mkCONFIG();
// const ARGV                    = require('../polyrepo/cdr0-config').mkARGV();
const getPort                 = require('../polyrepo/cdr0-ports');
const io                      = require('socket.io-client');


// const argv                = ARGV.json();
const omegaServer         = getPort('omega_server') || CONFIG('CDR0_OMEGASERVER_PORT') || 9880;
const omegaServerPort     = omegaServer.port;

module.exports.sendOne = function(room, data) {
  const socket = io(`http://${omegaServer.address}:${omegaServer.port}/`);     /* arg 2 can be a query obj */

  console.log(`Connecting to ${omegaServer.port}`)
  socket.on('connect', () => {
    console.log('connected')
    socket.emit('data', [data]);

    socket.close();
  });
};


