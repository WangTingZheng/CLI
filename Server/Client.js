#!/usr/bin/env node
var net = require('net');
var json =require('../json.js');

console.log("running...")
var client = new net.Socket();
client.setEncoding('utf8');

client.connect(3000,'192.168.0.102',function(){
      console.log("connecting...")
      while(json.readJson(1,"status")=="true"){
            for(var i=2;i<=4;i++){
                  client.write("Pin %s is %s",i,json.readJson(i,"status"))
            }
            console.log("send done!")
      }
});
client.on('data',function(data){
      console.log('receive data from server');
});