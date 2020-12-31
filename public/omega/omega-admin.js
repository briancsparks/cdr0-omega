
const adminPort      = 9880;


// --------------------------------------------------------------------------------------------------------------------
// The function to handle admin control messages. Just redefine it.
let onAdminCtrl = function(ctrlData, ...rest) {
  console.log(`This is the default onAdminCtrl() function. Override it.`)
  console.log(`Recv'd control message on /admin`, ctrlData, ...rest);
}

// The function to push admin data into. Just redefine it.
let onAdminData = function(data, ...rest) {
  console.log(`This is the default onAdminData() function. Override it.`)
  console.log(`Recv'd message on /admin`, data, ...rest);
}
// --------------------------------------------------------------------------------------------------------------------


// ====================================================================================================================
const adminSocket = io(`http://localhost:${adminPort}/admin`);    /* the '/admin' namespace/endpoint */

// --------------------------------------------------------------------------------------------------------------------
adminSocket.on('connect', () => {
  console.log(`Connected to /admin channel, id: ${adminSocket.id}`);
});

// --------------------------------------------------------------------------------------------------------------------
adminSocket.on('ctrl', (ctrlData, ...rest) => {
  // console.log(`Recv'd control data on /admin`, ctrlData);
  onAdminCtrl(ctrlData, ...rest);
});

// --------------------------------------------------------------------------------------------------------------------
adminSocket.on('data', (data, ...rest) => {
  // console.log(`Recv'd message on /admin`, data);
  onAdminData(data, ...rest);
});

