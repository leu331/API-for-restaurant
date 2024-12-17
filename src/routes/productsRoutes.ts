import { ProductController } from "@/controllers/productsController";
import { Router } from "express";

const productsRoutes = Router()
const productsController = new ProductController

productsRoutes.get("/", productsController.index)

export {productsRoutes}