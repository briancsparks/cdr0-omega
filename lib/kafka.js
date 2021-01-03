
const { Kafka }               = require('kafkajs');
const getPort                 = require('../polyrepo/cdr0-ports');
// const cardi0                  = require('./cdr0-socket-io');
const client                  = require('./client');

// const io                    = cardi0.io;
const {port, address}       = getPort('kafka');

const kafka = new Kafka({
  clientId: 'omega',
  brokers: [`${address}:${port}`],
});

const consumer = kafka.consumer({ groupId: 'omega-consumer-group' });

module.exports.sendTopicToRoom = sendTopicToRoom;

sendTopicToRoom('animals', 'root').then((...args) => console.log(...args)).catch(console.error);

async function sendTopicToRoom(topic, room) {
  await consumer.connect();
  await consumer.subscribe({topic, fromBeginning:true});

  await consumer.run({
    eachMessage: async ({topic, partition, message}) => {
      console.log('sendTopicToRoom:', {partition, value: message.value.toString()});
      // cardi0.sendToRoom(room, message.value.toString());

      client.sendOne(room, message.value.toString());
    }
  });
}


// const topic = 'animals'
//
// const run = async () => {
//   // Consuming
//   await consumer.connect()
//
//   await consumer.subscribe({ topic })
//
//   await consumer.run({
//     eachMessage: async ({ partition, message }) => {
//       console.log({
//         partition,
//         offset: message.offset,
//         value: message.value.toString(),
//       })
//     },
//   })
// }
//
// run().catch(console.error)
