#!/usr/bin/env node
var fs=require('fs');

var file="./data.json";
var result=JSON.parse(fs.readFileSync( file));

function dataInit(){
    var value=[]
    for(var i=0;i<2;i++){
        value[i]=result[i+1];
        //console.log(value[i]);
    }
    return value
}

module.exports ={
   
    readJson:function(line,column){
        var value=[]
        value=dataInit()
        return value[line][column]
    },
    modifyJson:function(line,column,value){
        var value=[]
        value=dataInit()
        value[line][column]=value
    }
};