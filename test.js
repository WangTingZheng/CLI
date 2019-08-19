#!/usr/bin/env node
var fs=require('fs');
var file="./data.json";
var result=JSON.parse(fs.readFileSync( file));
var x=[]
function dataInit(){
    var value=[]
    for(var i=0;i<2;i++){
        value[i]=result[i+1];
        console.log(value[i]);
    }
    return value
}

x=dataInit();
for(var y=0;y<2;y++){
    if(x[y][1]=='yes'){
          console.log("send pin %s, is %s",y+1,x[y][0])
    }
}