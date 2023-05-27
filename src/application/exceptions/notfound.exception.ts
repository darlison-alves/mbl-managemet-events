import HttpException from "./http.exception";

export class NotFoundEntityException extends HttpException {
    constructor(message: string) {
        super(404, message);
    }
}