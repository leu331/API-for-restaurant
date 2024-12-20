import { TablesController } from "@/controllers/tablesController";
import { Router } from "express"; 

const tablesRoutes = Router()

const tablesController = new TablesController

tablesRoutes.get("/", tablesController.index)

tablesRoutes.post("/", tablesController.create)

tablesRoutes.delete("/:id", tablesController.remove)

export {tablesRoutes}

