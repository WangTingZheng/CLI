#!/usr/bin/env node
var net = require('net');

const PORT = 3000;
const HOST = '0.0.0.0';

var word=1;

var clientHandler = function(socket){

  socket.on('data', function dataHandler(data) {
    socket.write('server received\n');
  });
  socket.on('close', function(){
    console.log(socket.remoteAddress, socket.remotePort, 'disconnected');
  })
  
  socket.on()
};

var app = net.createServer(clientHandler);

app.listen(PORT, HOST);
