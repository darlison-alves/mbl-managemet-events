import HttpException from "./http.exception";

export class ValidateFieldException extends HttpException {
    constructor(message: string = "") {
        super(422, message)
    }
}