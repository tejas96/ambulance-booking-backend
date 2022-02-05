import { HttpStatus, HttpStatusCode } from '../model/Http';

class ApiError extends Error {
    public code: number | HttpStatusCode;

    constructor(message: string | HttpStatus, code: HttpStatusCode) {
        super(message);
        this.name = this.constructor.name;
        this.code = code;
        Error.captureStackTrace(this, this.constructor);
    }
}

export default ApiError;
