import {Response, Request, NextFunction} from "express"
import { AppError } from "@/utils/AppError"

class ProductController {
    async index(request:Request, response:Response, next:NextFunction){
        try {
           return response.status(200).json({message: "Funcionando"}) 
        } 
        
        catch (error) {
            next(error)
        }
    }
}

export {ProductController}