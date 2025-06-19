import express from "express";
import { Request, Response } from "express";
const app = express();
import cors from "cors";
import  {authUser}  from "./middleware/authUser.js";
import jwt from "jsonwebtoken";
import JWT_SECRET from "./config.js";
import {createRoomSchema , createUserSchema , SigninSchema} from "../node_modules/@repo/common/src/types.js"

app.use(cors());
app.use(express.json());

app.post("/signup", (req: Request, res: Response) => {
      const parsedData = createUserSchema.safeParse(req.body);
     const { username, password } = req.body;
     if (!username || !password) {
           res.status(400).json({
               message: "Username and password are required"
          });
     }
     //confirm from database
     //db call
});

app.get("/signIn", (req: Request, res: Response) => {
     //db call to verify the user and return a JWT token
     const userId = 1;
     const token=jwt.sign({
          userId
     }, JWT_SECRET);

     res.json({
          token:token
     })

     

});

app.get("/createRoom", authUser, (req: Request, res: Response) => {
     //create a room for the user ,and return the roomId 

     res.json({
           roomId: "12345",
           message: "Room created successfully"
     })

});

app.listen(5000, () => {
     console.log("server is up bro and running on port 5000");
});