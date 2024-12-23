import { Router } from "express";
import { productsRoutes } from "./productsRoutes";
import { tablesRoutes } from "./tablesRoutes";
import { tableSessionsRoutes } from "./tableSessionRoutes";
import { ordersRoutes } from "./ordersRoutes";

const routes = Router()

routes.use("/products", productsRoutes)

routes.use("/tables", tablesRoutes)

routes.use("/tables-sessions", tableSessionsRoutes)

routes.use("/orders", ordersRoutes)

export {routes}