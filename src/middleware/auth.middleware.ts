import { NextFunction, Request, Response } from 'express';
import FirebaseAdmin from '../config/firebaseAdmin';
import ApiError from '../helper/errorHandling';
import { HttpStatus, HttpStatusCode } from '../model/Http';

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const { authorization } = req.headers;
    if (authorization) {
        FirebaseAdmin.auth()
            .verifyIdToken(authorization)
            .then((decodedToken) => {
                req.body.userId = decodedToken.uid;
                next();
            })
            .catch((err) => {
                res.status(401).send(err);
            });
    } else {
        throw new ApiError(
            HttpStatus.UNAUTHORIZED,
            HttpStatusCode.UNAUTHORIZED
        );

        return;
    }
    next();
};
export default authMiddleware;
