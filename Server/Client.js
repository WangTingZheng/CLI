#!/usr/bin/env node
var net = require('net');
var json =require('../json.js');

var client = new net.Socket();
client.setEncoding('utf8');
client.connect(3000,'192.168.0.102',function(){
      console.log('connect');
      while(json.readJson(0,0)=="true"){
            for(var u=0;u<2;u++){
                  if(json.readJson[u][1]=="true")
                  client.write("pin %s is %s\n",u,json.readJson[u][0])
            }
      }
});
client.on('data',function(data){
      console.log('receive data from server');
});