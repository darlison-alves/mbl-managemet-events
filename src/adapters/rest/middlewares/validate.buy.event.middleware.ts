import { NextFunction, Request, Response } from "express";
import { buyEventSchema } from "../../../application/domain/schemas/buy.event.schema";
import { ValidateFieldException } from "../../../application/exceptions/validate.field.exception";
import { Logger } from "../../configs/logger";

export async function validateBuyEventMiddleware(req: Request, res: Response, next: NextFunction) {
    Logger.info("[middleware]");
    try {
        await buyEventSchema.validate(req.body)    
    } catch (error) {
        Logger.error((error as Error).message)
        next(new ValidateFieldException((error as Error).message));
    }
    next();
}