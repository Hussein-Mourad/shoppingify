import { Request, Response } from "express";
import Product from "../models/Product";
import ShoppingList from "../models/ShoppingList";
import category from "./category";

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

    res.json({ shoppingList });
  } catch (err) {
    console.error(err);
    res.status(400).json(handleErrors(err));
  }
}

async function createOrUpdateCurrentShoppingList(req: Request, res: Response) {
  const userId = res.locals.user?._id;
  let { name, products, status } = req.body;
  if (!products) products = [];
  try {
    await checkProducts(products);
    let shoppingList = await ShoppingList.findOne({
      userId,
      status: "current",
    });
    if (shoppingList) {
      await ShoppingList.updateOne(
        { _id: shoppingList._id, userId },
        { name, products, status },
        {
          runValidators: true,
        }
      );
      shoppingList = await ShoppingList.findOne({ userId, status })
        .populate("products.category")
        .exec();
    } else {
      shoppingList = await ShoppingList.create({
        userId,
        name,
        products,
      });
      shoppingList = await ShoppingList.findOne({ userId, status: "current" })
        .populate("products.category")
        .exec();
    }
    res.json({ shoppingList });
  } catch (err) {
    console.error(err);
    res.status(400).json(handleErrors(err));
  }
}

async function findUserShoppingLists(req: Request, res: Response) {
  const { status } = req.query;
  const userId = res.locals.user?._id;
  let filter: any = { userId };
  if (status) filter = { ...filter, status };

  try {
    const shoppingLists = await ShoppingList.find(filter)
      .sort({ createdAt: -1 })
      .populate("products.category")
      .exec();

    res.json({ shoppingLists });
  } catch (err) {
    res.status(400).json({ shoppingLists: null });
  }
}

async function findUserShoppingListById(req: Request, res: Response) {
  const userId = res.locals.user?._id;
  try {
    const shoppingList = await ShoppingList.findOne({
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

async function getStatistics(req: Request, res: Response) {
  const userId = res.locals.user?._id;
  let products: any = [];
  let categories: any = [];

  try {
    const shoppingLists: any = await ShoppingList.find({ userId })
      .sort({ createdAt: -1 })
      .populate("products.category")
      .exec();

    for await (const shoppingList of shoppingLists) {
      for await (const product of shoppingList.products) {
        const productInDB = await Product.findOne({
          userId,
          _id: product._doc._id,
        });

        if (productInDB) {
          let findResult = products.find((product: any) => {
            return product.name === productInDB.name;
          });

          if (findResult) {
            findResult.count++;
            findResult.percentage =
              (findResult.count / shoppingLists.length) * 100;
          } else {
            products.push({
              ...product._doc,
              count: 1,
              percentage: (1 / shoppingLists.length) * 100,
            });
          }
        }
      }
    }

    for  (const product of products){
      let findResult = categories.find(
        (category: any) => category._id === product.category._id
      );

      if (findResult) {
        findResult.count++;
        findResult.percentage =
              (findResult.count / products.length) * 100;
      } else {
        categories.push({
          _id: product.category._id,
          name: product.category.name,
          count: 1,
          percentage:(1 / products.length) * 100,
        });
      }
    }

    if(products.length===0&&categories.length===0){
      throw new Error("No data found.");
    }
    res.json({ products, categories });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error:{message:"No data found."}});
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
  createOrUpdateCurrentShoppingList,
  findUserShoppingLists,
  findUserShoppingListById,
  updateShoppingListById,
  getStatistics,
};

