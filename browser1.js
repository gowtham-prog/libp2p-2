const { createLibp2p } = require('libp2p');
const { noise } = require('@chainsafe/libp2p-noise');
const { webRTCDirect } = require('@libp2p/webrtc-star');
const SimplePeer = require('simple-peer');

async function createNode() {
  const libp2p = await createLibp2p({
    modules: {
      transport: [webRTCDirect()],
      connEncryption: [noise()],
    },
  });

  return libp2p;
}

async function main() {
  const lib = await createNode();

  console.log('Local Peer ID:', lib.peerId.toB58String());

  // Set up the SimplePeer instance for Browser 1
  const peer1 = new SimplePeer({
    initiator: true,
    trickle: false,
  });

  peer1.on('signal', (data) => {
    console.log('Browser 1 SIGNAL:', JSON.stringify(data));
  });

  peer1.on('data', (data) => {
    console.log('Received in Browser 1:', data.toString());
  });

  // ... (rest of the code)
}

main().catch((err) => console.error('Error:', err));
