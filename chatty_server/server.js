// server.js

const express = require('express');
const SocketServer = require('ws').Server;
const uuidv4 = require('uuid/v4');


//uuidv4();

// Set the port to 3001
const PORT = 3002;

// Create a new express server
const server = express()
    // Make the express server serve static assets (html, javascript, css) from the /public folder
    .use(express.static('public'))
    .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

const wss = new SocketServer({ server });

wss.on('connection', (ws) => {
    console.log('Client connected');

    ws.on('message', message => {
        message = JSON.parse(message);

        switch (message.type) {
            case "incomingMessage":
                message.id = uuidv4();
                wss.clients.forEach(client => {
                    client.send(JSON.stringify(message));
                })
                break;
            case "incomingNotification":

                wss.clients.forEach(client => {
                    client.send(JSON.stringify(message));
                })
                break;
            default:
                console.log('in server and it aint working');
        }
    })

    // Set up a callback for when a client closes the socket. This usually means they closed their browser.
    ws.on('close', () => console.log('Client disconnected'));
});