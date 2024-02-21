const WebSocket = require('ws');

// Create a WebSocket server
const server = new WebSocket.Server({ port: 8080 });

// Event handler for a new WebSocket connection
server.on('connection', (socket) => {
  console.log('New client connected');

  // Event handler for messages from the client
  socket.on('message', (message) => {
    console.log(`Received message: ${message}`);

    // Echo the received message back to the client
    socket.send(`You sent: ${message}`);
  });

  // Event handler for the WebSocket connection being closed
  socket.on('close', () => {
    console.log('Client disconnected');
  });
});

console.log('WebSocket server running on ws://localhost:8080');
