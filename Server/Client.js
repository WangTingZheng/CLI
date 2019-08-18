var net = require('net');
var client = new net.Socket();
client.setEncoding('utf8');
client.connect(3000,'192.168.0.102',function(){
      console.log('connect');
      client.write('to server');
      client.end('end');
});
client.on('data',function(data){
      console.log('receive data from server');
});