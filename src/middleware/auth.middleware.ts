import { NextFunction, Response } from 'express';
import { DecodedIdToken } from 'firebase-admin/lib/auth/token-verifier';
import FirebaseAdmin from '../config/firebaseAdmin';
import { MyRequest } from '../model/Http';

const authMiddleware = async (
    req: MyRequest,
    res: Response,
    next: NextFunction
) => {
    const { authorization } = req.headers;
    if (authorization) {
        const token = authorization.substring(7);
        await FirebaseAdmin.auth()
            .verifyIdToken(token)
            .then((decodedIdToken: DecodedIdToken) => {
                req.authUser = decodedIdToken;
                next();
            })
            .catch((err) => {
                return res.status(401).send(err);
            });
    } else {
        return res.status(401).send('Unauthorized');
    }
};
export default authMiddleware;
