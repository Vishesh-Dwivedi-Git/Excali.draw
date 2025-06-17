import {WebSocketServer} from "ws";
import jwt from "jsonwebtoken";

const wss= new WebSocketServer({ port: 8080 });
wss.on("connection", function connection(ws:any, req:any) {
     console.log("New Client Connected");
     ws.on("message", function message(data: any) {
          //auth check 
          //fetch token from url
          const url= req.url;
          const param=new URLSearchParams(url.split('?')[1]);
          const token= param.get("token") as string;
          const decodedToken=jwt.verify(token,process.env.JWT_SECRET as string);
          if(!decodedToken){
                ws.close(1008, "Authentication failed");
                return;
          }
          //if token is valid, proceed with the message
          // Here you can also check the user ID or any other information from the token
          const id= (decodedToken as any).id;

          console.log("received: %s", data);
          ws.send(`Hello, you sent -> ${data}`);
     });
});