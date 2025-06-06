import {WebSocketServer} from "ws";

const wss= new WebSocketServer({ port: 8080 });
wss.on("connection", function connection(ws:any) {
     console.log("New Client Connected");
     ws.on("message", function message(data: any) {
          console.log("received: %s", data);
          ws.send(`Hello, you sent -> ${data}`);
     });
});