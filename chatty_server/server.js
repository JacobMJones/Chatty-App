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
    loginLogout('in', wss.clients.size);
    ws.on('message', message => {
        message = JSON.parse(message);
        switch (message.type) {
            case "incomingMessage":
                message.id = uuidv4();
                sendMessageToAllClients(message);
                break;
            case "incomingNotification":
                sendMessageToAllClients(message);
                break;
            default:
                console.log('In socket server, problem with message type');
        }
    })
    ws.on('close', () => {
        console.log('Client disconnected');
        loginLogout('out', wss.clients.size);
    });
});

const loginLogout = (inorout, clients) => {
    let loginObject = { type: 'login', count: clients };
    wss.clients.forEach(client => {
        client.send(JSON.stringify(loginObject));
    })
    console.log(`User logged ${inorout}. Total users: ${clients}`);
}
const sendMessageToAllClients = (message) => {
    wss.clients.forEach(client => {
        client.send(JSON.stringify(message));
    })
}