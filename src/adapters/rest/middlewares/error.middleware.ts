
import { NextFunction, Request, Response } from 'express';
import HttpException from '../../../application/exceptions/http.exception';

function errorMiddleware(error: HttpException, request: Request, response: Response, next: NextFunction) {

    const status = error.status || 500;
    const message = error.text_error || 'Something went wrong';
    response
        .status(status)
        .send({
            status,
            message,
        })
}

export default errorMiddleware;