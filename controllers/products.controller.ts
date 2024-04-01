import { RequestHandler } from "express";
import { createProduct, deleteProduct, getAllProducts, getProduct, updateProduct } from "../services/products.service";
import { IncomingProduct, Product } from "../types/Product";

export const createProductHandler: RequestHandler<{}, {}, Product> = async (req, res) => {
  if (!req.currentUser) {
    throw new Error("Unauthorized");
  }
  const { id } = req.currentUser;
  try {
    const product = await createProduct({ ...req.body, createdBy: id });
    res.status(201).json({ product });
  } catch (err) {
    console.log(err);
  }
};

export const getAllProductsHandler: RequestHandler<{}, {}, Product[]> = async (req, res) => {
  try {
    const products = await getAllProducts();
    res.status(200).json({ products });
  } catch (err) {
    console.log(err);
  }
};

export const getProductHandler: RequestHandler<any, {}, IncomingProduct> = async (req, res) => {
  try {
    const product = await getProduct(req.params.id);
    res.status(200).json({ product });
  } catch (err) {
    console.log(err);
  }
};

export const deleteProductHandler: RequestHandler<any, {}, IncomingProduct> = async (req, res) => {
  try {
    await deleteProduct(req.params.id);
    res.status(204).json({ product: null });
  } catch (err) {
    console.log(err);
  }
};
export const updateProductHandler: RequestHandler<any, {}, IncomingProduct> = async (req, res) => {
  try {
    const product = await updateProduct(req.body, req.params.id);
    res.status(200).json({ product });
  } catch (err) {
    console.log(err);
  }
};
