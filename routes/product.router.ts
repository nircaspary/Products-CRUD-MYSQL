import { Router } from "express";
import { createProductHandler, deleteProductHandler, getAllProductsHandler, getProductHandler, updateProductHandler } from "../controllers/products.controller";
import { currentUser } from "../middlewares/current-user";

const productRouter = Router();

productRouter.get("/", getAllProductsHandler);
productRouter.post("/", currentUser, createProductHandler);
productRouter.get("/:id", getProductHandler);
productRouter.put("/:id", currentUser, updateProductHandler);
productRouter.delete("/:id", currentUser, getProductHandler);
export default productRouter;
