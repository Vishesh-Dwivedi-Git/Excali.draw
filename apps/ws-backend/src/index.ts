import {WebSocketServer} from "ws";

const wss= new WebSocketServer({ port: 8080 });
wss.on("connection", function connection(ws:any, req:any) {
     console.log("New Client Connected");
     ws.on("message", function message(data: any) {
          //auth check 
          //fetch token from url
          const url= req.url;


          console.log("received: %s", data);
          ws.send(`Hello, you sent -> ${data}`);
     });
});