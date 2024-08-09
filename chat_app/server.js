const WebSocket = require('ws');
const server = new WebSocket.Server({ port: 8080 });

server.on('connection', ws => {
    ws.on('message', message => {
        // Broadcast the received message to all clients
        server.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    });

    ws.on('close', () => {
        console.log('A user has disconnected');
    });
});

console.log('WebSocket server is running on ws://localhost:8080');
