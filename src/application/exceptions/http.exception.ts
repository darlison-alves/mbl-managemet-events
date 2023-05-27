
class HttpException extends Error {
    status: number;
    message: string;
    text_error: string;
    constructor(status: number, message: string = "") {
        super(message);
        this.status = status;
        this.text_error = message;
    }
}

export default HttpException;