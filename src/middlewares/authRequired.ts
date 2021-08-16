import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import User from "../models/User";

export default async function authRequired(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.signedCookies.jwt;
  if (token) {
    try {
      const decodedToken = jwt.verify(
        token,
        process.env.JWT_SECRET || ""
      ) as JwtPayload;
      let user = await User.findById(decodedToken["id"]);
      if (user) {
        res.locals.user = user;
      }
    } catch (err) {
      res.status(401).json({error:"User is not authenticated"})
    }
  } else {
    res.status(401).json({error:"User is not authenticated"})
  }
  next();
}
async function authRequired2(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.signedCookies.jwt;

  if(!token) {
    return res.status(401).json({error:"User is not authenticated."})
  }
    try {
      const decodedToken = jwt.verify(
        token,
        process.env.JWT_SECRET || ""
      ) as JwtPayload;
      let user = await User.findById(decodedToken["id"]);
      if (!user) {
        return res.status(401).json({error:"User is not authenticated."})
      }
      res.locals.user = user;
    } catch (err) {
      return res.status(401).json({error:"User is not authenticated"})
    }
  next();
}
