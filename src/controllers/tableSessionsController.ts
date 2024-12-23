import { Request, Response, NextFunction } from "express";
import {z} from "zod"
import { knex } from "@/database/knex";
import { AppError } from "@/utils/AppError";
import { table } from "console";

class TableSessionController{
    async create(request:Request, response:Response, next:NextFunction){
        try {
            const bodySchema = z.object({
                table_id: z.number({required_error: "table_id is required"})
            })

            const {table_id} = bodySchema.parse(request.body)

            const session = await knex<TableSessionRepository>("table-sessions")
            .where("table_id", table_id).orderBy("opened_at", "desc").first();
  
            if (session && !session.closed_at) {
                throw new AppError("This table is already open")
            } 
            
            await knex<TableSessionRepository>("table-sessions").insert({table_id, opened_at: knex.fn.now()})

            return response.json(session)

            await knex("table-sessions").insert({
                table_id, 
                opened_at: knex.fn.now()
            })
            
            return response.status(201).json("working")
        } 
        
        catch (error) {
            next(error)
        }
    }

    async index(request:Request, response:Response, next:NextFunction){
        try {
            const sessions = await knex<TableSessionRepository>("table-sessions").orderBy("closed_at")

            return response.status(200).json(sessions)
        } 
        catch (error) {
            next(error)    
        }
    }

    async update(request:Request, response:Response, next:NextFunction){
        try {
            const id = z.string().transform((value) => Number(value)).refine((value) => !isNaN(value), {message: "id must be a number"}).parse(request.params.id)

            const session = await knex<TableSessionRepository>("table-sessions").where({id}).first()

            if (!session){
                throw new AppError("session not found")
            }

            if(session.closed_at){
                throw new AppError("This session is already closed")
            }
            
            await knex <TableSessionRepository>("table-sessions").update({closed_at: knex.fn.now()}).where({id})

            return response.status(200).json("Updated successfully")
 
        } 
        catch (error) {
            next(error)
        }
    }
}

export {TableSessionController}