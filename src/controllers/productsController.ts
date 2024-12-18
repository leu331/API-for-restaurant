import {Response, Request, NextFunction} from "express"
import { AppError } from "@/utils/AppError"
import { z } from "zod"
import {knex} from "@/database/knex"

class ProductController {
    async index(request:Request, response:Response, next:NextFunction){
        try {
            const {name} = request.query
           const products = await knex<ProductRepository>("products").select().whereLike("name", `%${name ?? ""}%`).orderBy("id")
           
           return response.json(products) 
        } 
        
        catch (error) {
            next(error)
        }
    }

    async create(request:Request, response:Response, next:NextFunction){
        try {
            const bodySchema = z.object({
                name: z.string({required_error: "name is required!"}).trim(),
                price: z.number({required_error: "price is required!"}).gt(0, {message: "value must be greater than 0"})
            })

            const {name, price} = bodySchema.parse(request.body)
            //const {name, price} = request.body
            await knex<ProductRepository>("products").insert({name, price})

           return response.status(201).json({name, price}) 
        } 
        
        catch (error) {
            next(error)
        }
    }

    async update(request:Request, response:Response, next:NextFunction){
        try {
            const id = z.string().transform((value) => Number(value)). refine((value) => !isNaN(value), {message: "id must be a number"}).parse(request.params.id)


            const bodySchema = z.object({
            name: z.string({required_error: "name is required!"}).trim(),
            price: z.number({required_error: "price is required!"}).gt(0, {message: "value must be greater than 0"})

            
           })

           const {name, price} = bodySchema.parse(request.body)

           await knex <ProductRepository>("products").update({name, price, updated_at: knex.fn.now()}).where({id})

           response.status(200).json({message: "Product updated"})
        }

        catch (error) {
            next(error)
        }
    }

    async remove(request:Request, response:Response, next:NextFunction){
        try {
            const id = z.string().transform((value) => Number(value)). refine((value) => !isNaN(value), {message: "id must be a number"}).parse(request.params.id)

           await knex <ProductRepository>("products").delete().where({id})

           response.status(200).json({message: "Product deleted"})
        }

        catch (error) {
            next(error)
        }
    }
}

export {ProductController}