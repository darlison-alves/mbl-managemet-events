import HttpException from "./http.exception";

export class EventNotAvailable extends HttpException {
    constructor() {
        super(400, "evento não está disponível!")
    }
}