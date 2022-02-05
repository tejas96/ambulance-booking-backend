import { Request, Response } from 'express';
import ApiError from '../helper/errorHandling';

const errorMiddleware = (err: ApiError, _: Request, res: Response) => {
    console.log('tejas', err.code);
    res.send(err.message);
};

export default errorMiddleware;
