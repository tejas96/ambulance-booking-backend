import { Response } from 'express';
import Admin from '../config/firebaseAdmin';
import {
    HttpStatusCode,
    MyRequest,
    Response as ResponseModel,
} from '../model/Http';
import User from '../model/User';

export const registerUser = async (req: MyRequest, res: Response) => {
    const uid = req.authUser?.uid || '';
    const user = <User>req.body;
    await Admin.firestore()
        .collection('Users')
        .doc(uid)
        .set(user)
        .then((doc) => {
            if (doc.isEqual(doc)) {
                res.status(HttpStatusCode.OK).send(
                    'User registered successfully'
                );
            } else {
                res.status(HttpStatusCode.NOT_CREATED).send('User not created');
            }
        })
        .catch((err) => {
            const resObject: ResponseModel = {
                status: HttpStatusCode.NOT_CREATED,
                message: err.message,
                data: null,
                error: err.inner,
            };
            res.status(400).json(resObject);
        });
};

export const getUser = async (req: MyRequest, res: Response) => {
    const uid = req.authUser?.uid || '';
    const user = await Admin.firestore().collection('Users').doc(uid).get();

    const userObject = user.data();
    if (!userObject) return res.status(400).send('User not found');

    return res.status(200).send(userObject);
};
