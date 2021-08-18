import { Request, Response } from "express";
import Product from "../models/Product";
import ShoppingList from "../models/ShoppingList";

async function createShoppingList(req: Request, res: Response) {
  const userId = res.locals.user?._id;

  let { name, products } = req.body;
  try {
    if (products) {
      await checkProducts(products);
    } else {
      products = [];
    }

    const shoppingList = await ShoppingList.create({
      userId,
      name,
      products,
    });
    delete shoppingList.userId;
    res.json({ shoppingList });
  } catch (err) {
    console.error(err);
    res.status(400).json(handleErrors(err));
  }
}

async function findUserShoppingLists(req: Request, res: Response) {
  const userId = res.locals.user?._id;

  try {
    const shoppingLists = await ShoppingList.find({ userId })
      .sort({ createdAt: -1 })
      .populate("products.category")
      .exec();
    shoppingLists.forEach((list: any) => {
      delete list.userId;
    });
    res.json({ shoppingLists });
  } catch (err) {
    res.status(400).json({ shoppingLists: null });
  }
}

async function findUserShoppingListById(req: Request, res: Response) {
  const userId = res.locals.user?._id;
  try {
    const shoppingList =await ShoppingList.findOne({
      _id: req.params.id,
      userId,
    })
      .sort({ createdAt: -1 })
      .populate("products.category")
      .exec();
    return res.json({ shoppingList });
  } catch (err) {
    return res.status(400).json({ shoppingLists: null });
  }
}

async function updateShoppingListById(req: Request, res: Response) {
  const userId = res.locals.user?._id;
  const { id } = req.params;
  let { name, products, status } = req.body;
  let newList: any = { name, status };

  try {
    if (products) {
      newList.products = products;
      await checkProducts(products);
    }

    await ShoppingList.updateOne({ _id: id, userId }, newList, {
      runValidators: true,
    });
    res.json("Updated successfully.");
  } catch (err) {
    res.status(400).json(handleErrors(err));
  }
}

async function checkProducts(products: any) {
  for (const product of products) {
    if (product._id.length !== 12 && product._id.length !== 24)
      throw new Error("Invalid product id.");
    const p = await Product.findById(product._id);
    if (!p) throw new Error("Invalid product id.");
  }
}

function handleErrors(err: { message: string; code: number; errors: any }) {
  let errors: any = {};

  if (err.message === "Invalid product id.") {
    errors.message = err.message;
  }
  if (err.message.toLowerCase().includes("validation failed")) {
    Object.values(err.errors).forEach((value: any) => {
      errors[value.properties.path] = value.properties.message;
    });
  }

  return { errors };
}

export default {
  createShoppingList,
  findUserShoppingLists,
  findUserShoppingListById,
  updateShoppingListById,
};
