import { Router } from "express"
import { TableSessionController } from "@/controllers/tableSessionsController"

const tableSessionsRoutes = Router()

const tableSessionController = new TableSessionController

tableSessionsRoutes.post("/", tableSessionController.create)

tableSessionsRoutes.get("/", tableSessionController.index)

tableSessionsRoutes.patch("/:id", tableSessionController.update)

export {tableSessionsRoutes}