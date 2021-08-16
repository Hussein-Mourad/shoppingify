import { Request, Response } from "express";
import { CallbackError } from "mongoose";
import Category from "../models/Category";
import Product from "../models/Product";

async function createProduct(req: Request, res: Response) {
  const { userId, name, imageUrl, description, categoryId } = req.body;
  try {
    await Category.checkUserCategory(categoryId, userId);
    const product = await Product.create({
      userId,
      name,
      imageUrl,
      description,
      categoryId,
    });

    res.json({ product });
  } catch (err) {
    res.status(400).json(handleErrors(err));
  }
}

async function findAllUserProducts(req: Request, res: Response) {
  const { userId } = req.body;
  try {
    const products = await Product.find({ userId });
    res.json({ products });
  } catch (err) {
    res.status(400).json({ products: null });
  }
}

async function findProductById(req: Request, res: Response) {
  const { id } = req.params;
  const { userId } = req.body;
  try {
    const product = await Product.findOne({ _id: id, userId });
    res.json({ product });
  } catch (err) {
    res.status(400).json({ product: null });
  }
}

async function deleteProduct(req: Request, res: Response) {
  const { id } = req.params;
  const { userId } = req.body;

  Product.deleteOne({ _id: id, userId }, (err: CallbackError) => {
    if (!err) {
      res.json("Product deleted successfully.");
    } else {
      res.status(400).json("Error deleting the product");
    }
  });
}

function handleErrors(err: { message: string; code: number; errors: any }) {
  let errors: any = {};

  errors.message = err.message;
  if (err.errors) {
    Object.values(err.errors).forEach((value: any) => {
      errors[value.properties.path] = value.properties.message;
    });
  }

  return { errors };
}

export default {
  createProduct,
  findAllUserProducts,
  findProductById,
  deleteProduct,
};
