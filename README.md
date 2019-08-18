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
nodemcu
```

来开启服务器

## 开启客户端

在PlatformIO新创立一个nodemcu v1.0, 使用Arduino core，在`./src/main.cpp`内添加：

```c
/*
    This sketch sends a string to a TCP server, and prints a one-line response.
    You must run a TCP server in your local network.
    For example, on Linux you can use this command: nc -v -l 3000
*/

#include <ESP8266WiFi.h>
#include <ESP8266WiFiMulti.h>

#ifndef STASSID
#define STASSID "TP-LINK_502"
#define STAPSK  "GZwy502666.."
#endif

const char* ssid     = STASSID;
const char* password = STAPSK;

const char* host = "192.168.0.101";
const uint16_t port = 3000;

ESP8266WiFiMulti WiFiMulti;

void setup() {
  Serial.begin(9600);

  // We start by connecting to a WiFi network
  WiFi.mode(WIFI_STA);
  WiFiMulti.addAP(ssid, password);

  Serial.println();
  Serial.println();
  Serial.print("Wait for WiFi... ");

  while (WiFiMulti.run() != WL_CONNECTED) {
    Serial.print(".");
    delay(500);
  }

  Serial.println("");
  Serial.println("WiFi connected");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());

  delay(500);
}


void loop() {
  Serial.print("connecting to ");
  Serial.print(host);
  Serial.print(':');
  Serial.println(port);

  // Use WiFiClient class to create TCP connections
  WiFiClient client;

  if (!client.connect(host, port)) {
    Serial.println("connection failed");
    Serial.println("wait 5 sec...");
    delay(5000);
    return;
  }

  // This will send the request to the server
  client.println("hello from ESP8266");

  //read back one line from server
  Serial.println("receiving from remote server");
  String line = client.readStringUntil('\r');
  Serial.println(line);

  Serial.println("closing connection");
  client.stop();

  Serial.println("wait 5 sec...");
  delay(5000);
}
```

#### 修改参数

将下面的WIFI改为你自己的WIFI

```c
#define STASSID "TP-LINK_502"
#define STAPSK  "GZwy502666.."
```

将下面的值改为你termux里ifconfig出来的值：

```c
const char* host = "192.168.0.101";
```

## 执行

将项目上传到nodemcu，会出现一些发送过来的信息。