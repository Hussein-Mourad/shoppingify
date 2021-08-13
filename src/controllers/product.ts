import { NextFunction, Request, Response } from "express";
import { CallbackError } from "mongoose";
import Category from "../models/Category";
import Product from "../models/Product";
import User from "../models/User";

async function createProduct(req: Request, res: Response, next: NextFunction) {
  const { id, name, imageUrl, description, categoryId } = req.body;
  try {
    const user = await User.isValidUser(id);
    // const category = await Category.isValidCategory(categoryId, id);
    res.json(user);
  } catch (err) {
    res.json({ user: null });
  }
}

async function deleteProduct(req: Request, res: Response, next: NextFunction) {
  const { id } = req.params;

  Product.deleteOne({ _id: id }, (err: CallbackError) => {
    if (!err) {
      res.json("Product deleted successfully.");
    } else {
      res.status(400).json("Error deleting the product");
    }
  });
}

function handleModelErrors(err: {
  message: string;
  code: number;
  errors: any;
}) {
  let errors: any;

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

export default { createProduct, deleteProduct };
