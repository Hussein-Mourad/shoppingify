import { Request, Response } from "express";
import Category from "../models/Category";

async function createCategory(req: Request, res: Response) {
  const { name } = req.body;
  const userId = res.locals.user?._id;

  try {
    let category = await Category.findOne({name, userId});
    if(!category){
       category = await Category.create({
        userId,
        name,
      });
    }

    res.json({ category });
  } catch (err) {
    res.status(400).json(handleErrors(err));
  }
}

async function findAllUserCategories(req: Request, res: Response) {
  const userId = res.locals.user?._id;
  try {
    const categories = await Category.find({ userId });
    res.json({ categories });
  } catch (err) {
    res.status(400).json({ categories: null });
  }
}

async function findCategoryById(req: Request, res: Response) {
  const { id } = req.params;
  const userId = res.locals.user?._id;

  try {
    const category = await Category.findOne({ _id: id, userId });
    res.json({ category });
  } catch (err) {
    res.status(400).json({ category: null });
  }
}

function handleErrors(err: { message: string; code: number; errors: any }) {
  let errors: any = {};

  if (err.errors) {
    Object.values(err.errors).forEach((value: any) => {
      errors[value.properties.path] = value.properties.message;
    });
  }

  return { errors };
}

export default {
  createCategory,
  findAllUserCategories,
  findCategoryById,
};
