import { Request } from 'express';
import { DecodedIdToken } from 'firebase-admin/lib/auth/token-verifier';

export type Response = {
    status?: number;
    message: string;
    data: any;
    error: any;
};
export enum HttpStatusCode {
    OK = 200,
    CREATED = 201,
    NO_CONTENT = 204,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    INTERNAL_SERVER_ERROR = 500,
    NOT_CREATED = 205,
}

export enum HttpStatus {
    OK = 'OK',
    CREATED = 'CREATED',
    NO_CONTENT = 'NO_CONTENT',
    BAD_REQUEST = 'BAD_REQUEST',
    UNAUTHORIZED = 'UNAUTHORIZED',
    FORBIDDEN = 'FORBIDDEN',
    NOT_FOUND = 'NOT_FOUND',
    INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR',
    NOT_CREATED = 'DATA NOT CREATED',
}
export interface MyRequest extends Request {
    authUser?: DecodedIdToken;
}
