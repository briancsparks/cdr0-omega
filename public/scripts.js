
// TODO: Dont we just have to io('/') ???
const mainPort  = 9880;
let   username  = "larry";

username = username || prompt("What is your username?");


// --------------------------------------------------------------------------------------------------------------------
// The function to handle control messages. Just redefine it.
let onCtrl = function(ctrlData, ...rest) {
  console.log(`This is the default onCtrl() function. Override it.`)
  console.log(`Recv'd control message`, ctrlData, ...rest);
}

// The function to push data into. Just redefine it.
let onData = function(data, ...rest) {
  console.log(`This is the default onData() function. Override it.`)
  console.log(`Recv'd message`, data, ...rest);
}
// --------------------------------------------------------------------------------------------------------------------


// ====================================================================================================================
const socket = io(`http://localhost:${mainPort}`, {        /* the '/' namespace/endpoint */
  query: {
    username
  }
});

// --------------------------------------------------------------------------------------------------------------------
socket.on('connect', () => {
  console.log(`Connected to / channel, id: ${socket.id}`);
});

// --------------------------------------------------------------------------------------------------------------------
socket.on('ctrl', (ctrlData, ...rest) => {
  // console.log(`Recv'd control data`, ctrlData);
  onCtrl(ctrlData, ...rest);
});

// --------------------------------------------------------------------------------------------------------------------
socket.on('data', (data, ...rest) => {
  // console.log(`Recv'd message`, data);
  onData(data, ...rest)
});

