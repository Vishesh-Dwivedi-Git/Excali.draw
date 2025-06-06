import { Request, Response, NextFunction, RequestHandler } from 'express';
import jwt from 'jsonwebtoken';

interface UserPayload {
  userId: string;
  email: string;
}

// Extend the Request interface to include `user`
declare global {
  namespace Express {
    interface Request {
      user?: string;
    }
  }
}

export const authUser  = (req:Request , res:Response, next: NextFunction)=> {
  const token = req.headers.authorization?.split(" ")[1];
  console.log("Token:", token);

  if (!token) {
    console.log("No token provided");
    res.status(401).json({ message: "No token provided" });
    return; 
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as UserPayload;
    req.user = decoded.userId;
    next();
    return;
  } catch (error) {
    console.log("Error in authUser middleware:", error);
   res.status(401).json({
      message: "Invalid or expired token",
      error: error instanceof Error ? error.message : "Unknown error"
    });
    return; 
  }

};
