import {Response, Request, NextFunction} from "express"
import { AppError } from "@/utils/AppError"
import { z } from "zod"
import {knex} from "@/database/knex"

class TablesController {
    async index(request:Request, response:Response, next:NextFunction,){
        try {
           const {user_name} = request.query

            const tables = await knex<TableRepository>("tables").select().whereLike("user_name", `%${user_name ?? ""}%`).orderBy("id") 

            return response.status(200).json(tables)
        } 
        
        catch (error) {
            next(error)    
        }
    }

    async create(request:Request, response:Response, next:NextFunction,){
        try {
            const bodySchema = z.object({
                user_name: z.string({required_error: "client name is required"}).trim(),

                table_number: z.number({required_error: "Table number is required"}).gt(0, {message: "Table number has must be greater than 0"})
            })

            const {user_name, table_number} = bodySchema.parse(request.body) 

            await knex<TableRepository>("tables").insert({user_name, table_number})

            return response.status(201).json({message: "Created successfully"})
        } 
        
        catch (error) {
            next(error)
        }
    }

    async remove(request:Request, response:Response, next:NextFunction){
        try {
            const id = z.string().transform((value) => Number(value)). refine((value) => !isNaN(value), {message: "id must be a number"}).parse(request.params.id)

           await knex <ProductRepository>("tables").delete().where({id})

           response.status(200).json({message: "Table deleted"})
        }

        catch (error) {
            next(error)
        }
    }
}

export {TablesController}