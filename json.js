#!/usr/bin/env node
var fs=require('fs');

var file="data.json";
var result=JSON.parse(fs.readFileSync( file));


function changeJson(id,params){
    fs.readFile('./data.json',function(err,data){
        if(err){
            console.error(err);
        }
        var person = data.toString();
        person = JSON.parse(person);
        //把数据读出来,然后进行修改
        for(var i = 0; i < person.data.length;i++){
            if(id == person.data[i].id){
                for(var key in params){
                    if(person.data[i][key]){
                        person.data[i][key] = params[key];
                    }
                }
            }
        }
        person.total = person.data.length;
        var str = JSON.stringify(person,"","\t");
        //console.log(str);
        fs.writeFile('./data.json',str,function(err){
            if(err){
                console.error(err);
            }
        })
    })
}

module.exports ={
    readJson:function(id,choice){
        var params = {
            "status":"false",
            "value":"LOW"
        }
        fs.readFile('./data.json',function(err,data){
            if(err){
                console.error(err);
            }
            var person = data.toString();
            person = JSON.parse(person);
            //把数据读出来,然后进行修改
            for(var i = 0; i < person.data.length;i++){
                if(id == person.data[i].id){
                    for(var key in params){
                        if(person.data[i][key]){
                            params[key]=person.data[i][key];
                        }
                    }
                }
            }
        })
        if(choice=="status")
        return params.status
        else return params.value
    },
    modifyJson:function(id,status,value){
        var params = {
            "status":"true",
            "value":"LOW"
        }
        params.status=status;
        params.value=value;
        changeJson(id,params)
    }
};


