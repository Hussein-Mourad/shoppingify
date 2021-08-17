import { Request, Response } from "express";
import { CallbackError } from "mongoose";
import Category from "../models/Category";
import Product from "../models/Product";

async function createProduct(req: Request, res: Response) {
  const userId = res.locals.user?._id;

  const { name, imageUrl, description, categoryId } = req.body;
  try {
    const category = await Category.checkUserCategory(categoryId, userId);
    const product = await Product.create({
      userId,
      name,
      imageUrl,
      description,
      category: categoryId,
    });

    res.json({ product: { ...product, category } });
  } catch (err) {
    console.error(err);
    res.status(400).json(handleErrors(err));
  }
}

async function findUserProducts(req: Request, res: Response) {
  const userId = res.locals.user?._id;
  const name = req.query.name || "";

  try {
    const products = await Product.find({
      name: { $regex: name, $options: "i" },
      userId,
    })
      .populate("category")
      .exec();
    res.json({ products });
  } catch (err) {
    res.status(400).json({ products: null });
  }
}

async function findProductById(req: Request, res: Response) {
  const { id } = req.params;
  const userId = res.locals.user?._id;

  try {
    const product = await Product.find({ _id: id, userId })
      .populate("category")
      .exec();

    res.json({ product });
  } catch (err) {
    res.status(400).json({ product: null });
  }
}

async function deleteProduct(req: Request, res: Response) {
  const { id } = req.params;
  const userId = res.locals.user?._id;

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

  if (err.message === "Category is not found") {
    errors.message = err.message;
  }

  if (err.errors) {
    Object.values(err.errors).forEach((value: any) => {
      errors[value.properties.path] = value.properties.message;
    });
  }

  return { errors };
}

export default {
  createProduct,
  findUserProducts,
  findProductById,
  deleteProduct,
};
