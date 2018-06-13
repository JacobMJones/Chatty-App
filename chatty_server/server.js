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

// Create the WebSockets server
const wss = new SocketServer({ server });

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
    console.log('Client connected');

    ws.on('message', message => {
        message = JSON.parse(message);
        let m = `User ${message.username} says ${message.content}`;
        console.log('message is', m);
        message.id = uuidv4();
        console.log('message with uuid', message);

        wss.clients.forEach(client => {
            console.log('its in here');
            client.send(JSON.stringify(message));
        })

    })

    // Set up a callback for when a client closes the socket. This usually means they closed their browser.
    ws.on('close', () => console.log('Client disconnected'));
});