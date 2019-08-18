   /*client.js*/
var net=require('net');
var stop = false;
const PORT = 3000;
const HOST = '0.0.0.0';

process.stdin.resume(); 
   
process.stdin.on('data', function(data){
    if(data.toString().trim().toLowerCase()==='stop'){
        stop=true;
        console.log('connection stop\n');
        client.end();
    }else{
        client.write(data);
    }
});
   
var client=net.createConnection(HOST,PORT,function () {
    console.log('connected to server!\n');
});
client.on('data', function(data) {
    console.log(data.toString());//打印服务器发送的数据
});
client.on('error', function(err) {
    console.log('Error in connection:'+ err+'\n');
});
client.on('close', function() {
    if(! stop) {
        console.log('connection got closed');
    }
});