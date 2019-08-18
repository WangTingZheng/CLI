# 一次TCP连接

> 本次实验，我们将尝试在本地，在nodemcu和安卓手机就行TCP通信

本次实验用到了：

- nodejs
- PlatformIO for vscode
- termux
- nodemcu开发板
- Arduino core for nodemcu

## 软件安装

- 安装vscode
- 安装PlatformIO for vscode
- 在安卓手机上安装termux

## 开启本地服务器

安装后打开termux，注意，第一次打开需要科学上网来连接服务器更新软件。之后我们需要安装一些必要软件：

```
pkg install nodejs
pkg install vim
```

我们先执行`ifconfig`来查看设备的ip，在返回的信息中找到一个叫`inet`的值，记下它的值。

执行以下命令：

```bash
git clone https://github.com/wangtingzheng/cli.git
cd cli
npm link
nodemcu do start
```

来开启服务器

## 开启客户端

在PlatformIO新创立一个nodemcu v1.0, 使用Arduino core，在`./src/main.cpp`内添加：

```c
/*在NodeMCU搭建了TCP server端，PC为client端与server进行简单通信*/
#include <ESP8266WiFi.h>
#include <WiFiClient.h>

// Hardcode WiFi parameters as this isn't ging to be moving around.
const char* ssid = "TP-LINK_502"; //填入自己的WiFi名
const char* password = "GZwy502666.."; //WiFi密码

// Start a TCP Server on port 5045
IPAddress remoteIP(192,168,0,102); 
WiFiServer server(remoteIP,3000); //端口5045，自定义（避免公用端口）
WiFiClient client;

char data[1500];
int ind = 0;

void setup() {
  Serial.begin(9600);
  WiFi.begin(ssid,password);
  Serial.println("");
  //Wait for connection
  while(WiFi.status() != WL_CONNECTED) { //检查WiFi连接状态
    delay(500);
    Serial.print(".");
  }
  Serial.print("Connected to "); Serial.println(ssid);
  Serial.print("IP Address: "); Serial.println(WiFi.localIP()); //串口监视器显示IP地址

  server.begin();    // Start the TCP server
}

void loop() {
    // put your main code here, to run repeatedly:
    if(!client.connected()){   //try to connect to a new client
      client = server.available();
    }
    else{
      if(client.available() > 0){      //Serial.println("Connected to client");
        while(client.available()){
          data[ind] = client.read(); //读取client端发送的字符
          ind++;
      }
      client.flush();
      for(int j=0;j < ind; j++){
        Serial.print(data[j]);
      }
      Serial.print("\n");
      ind = 0;
      client.print("OK! Got your request."); //在client端回复
    }
  }
}
```

#### 修改参数

将下面的WIFI改为你自己的WIFI

```c
const char* ssid = "TP-LINK_502"; //填入自己的WiFi名
const char* password = "GZwy502666.."; //WiFi密码
```

将下面的值改为你termux里ifconfig出来的值：

```c
IPAddress remoteIP(192,168,0,102); 
```

## 执行

将项目上传到nodemcu，会出现一些发送过来的信息。