
require('dotenv').config()

const CONFIG                  = require('../polyrepo/cdr0-config').mkCONFIG();
const ARGV                    = require('../polyrepo/cdr0-config').mkARGV();
const getPort                 = require('../polyrepo/cdr0-ports');
const io                      = require('socket.io-client');

// TODO: stdin mode.
//
// * Now: reads a single JSON from ARGV.
// * New: Always send as Array. -- Done.
// * Add: Read from Kafka stream mode.
// * Add: Read stream from stdin
//   * using '-' trick,
//   * Or, if 'argv' (below) has no data
// * Could be a JSON line-by-line string, a single JSON object, or line-by-line non-JSON data
//   * line-by-line should be sent as {line: "-the-line-data-"}

const argv                = ARGV.json();
const omegaServer         = getPort('omega_server') || CONFIG('CDR0_OMEGASERVER_PORT') || 9880;
const omegaServerPort     = omegaServer.port;

const socket = io(`http://${omegaServer.address}:${omegaServer.port}/`);     /* arg 2 can be a query obj */

// console.log(`Connecting to ${omegaServer.port}`)
socket.on('connect', () => {
  // console.log('connected')
  socket.emit('data', [argv]);

  socket.close();
});

