import { AppError } from "@/utils/AppError";
import { Request, Response, NextFunction } from "express";
export function errorHandling (error: any, request:Request, response: Response, _:NextFunction){
    if(error instanceof AppError) {
        return response.status(error.statusCode).json({message: "Invalid request"})
    }

    return response.status(500).json({message: error.message})
}