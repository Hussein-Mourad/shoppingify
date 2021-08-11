// import User from "../models/User"
// import jwt from "jsonwebtoken"

import { NextFunction, Request, Response } from "express";

function login(req: Request, res: Response, next: NextFunction): void {
  const { username, password } = req.body;
  console.log(req.body);
}

export default {
  login,
};
