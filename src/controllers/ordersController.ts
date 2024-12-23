import {Request, Response, NextFunction} from "express"
import { knex } from "@/database/knex"
import {z} from "zod"
import { AppError } from "@/utils/AppError"
import { error } from "console"

class OrdersController {
    async create(request:Request, response:Response, next:NextFunction){
        try {
            const bodySchema = z.object({
                table_session_id: z.number(),
                product_id: z.number(),
                quantity: z.number()
            })
            const {table_session_id, product_id, quantity} = bodySchema.parse(request.body)

            const session = await knex<TableSessionRepository>("table-sessions").where({id: table_session_id}).first()

            const products = await knex<ProductRepository>("products").where({id: product_id}).first()

            if (!session){
                throw new AppError("Table session not found")
            }
            
            if (session.closed_at) {
                throw new AppError ("This table is closed")
            }

            if (!products) {
                throw new AppError("Product not found")
            }

            await knex<OrderRepository>("orders").insert({product_id, table_session_id, quantity, price: products.price})
           

            return response.status(201).json({message: "order created successfully"})
        } 
        
        catch (error) {
            next(error)
        }
    }

    async index(request:Request, response:Response, next:NextFunction){
        try {
            const {table_session_id} = request.params

            const order = await knex("orders").select("orders.id", 
                "orders.table_session_id", 
                "orders.product_id", "products.name", 
                "orders.price", 
                "orders.quantity",
                knex.raw("(orders.price * orders.quantity) AS total"),
                "orders.created_at", 
                "orders.updated_at")
                .join("products", "products.id", "orders.product_id",)
                .where({table_session_id}).orderBy("orders.created_at")

             const orders = await knex<OrderRepository>("orders").select() 
             return response.status(200).json(order)

        }
         catch (error) {
            next(error)
        }
       
    }

    async show(request:Request, response:Response, next:NextFunction){
        try {
            const {table_session_id} = request.params

            const order = await knex("orders")
            .select(knex.raw("COALESCE(SUM(orders.price * orders.quantity), 0) AS total"), 
                    knex.raw("COALESCE(SUM(orders.quantity), 0) AS quantity"))
            .where({table_session_id})
            .first()

            return response.json(order)

        }
         catch (error) {
            next(error)
        }
       
    }
}

export {OrdersController}