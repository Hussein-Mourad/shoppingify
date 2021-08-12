
import { NextFunction, Request, Response } from "express"
import Product, {IProduct} from "../models/Product";

function create(req: Request, res: Response, next: NextFunction) {
  const {id, name, imageUrl, description, category} = req.body;

}



function handleModelErrors(err: { message: string; code: number; errors: any }) {
  let errors:any;

  if (err.message === "Invalid username and/or password") {
    errors.error = err.message;
  }
  if (err.code == 11000) {
    errors.username = "Username is already taken.";
  }
  if (err.message.toLowerCase().includes("user validation failed")) {
    Object.values(err.errors).forEach((value: any) => {
      //@ts-ignore
      errors[value.properties.path] = value.properties.message;
    });
  }
  return { errors };
}


export default {};

