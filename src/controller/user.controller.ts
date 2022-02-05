import { Request, Response } from 'express';
import { Response as ResponseModel, HttpStatusCode } from '../model/Http';
import Admin from '../config/firebaseAdmin';
import User from '../model/User';
import { userRegisterSchema } from '../validations/rules';

export const registerUser = (req: Request, res: Response) => {
    userRegisterSchema
        .validate(req.body, { abortEarly: false })
        .catch((err) => {
            const resObject: ResponseModel = {
                status: 400,
                message: err.message,
                data: null,
                error: err.inner,
            };
            res.status(400).json(resObject);
        });
    const user = <User>req.body;
    Admin.firestore()
        .collection('Users')
        .add({
            user,
        })
        .then((doc) => {
            console.log(doc.id);
            res.send(doc.id);
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

export const getUser = async (req: Request, res: Response) => {
    const { user_id } = req.body;
    const user = await Admin.firestore().collection('Users').doc(user_id).get();

    const userObject = user.data();
    if (!userObject)
        return res.status(400).json({
            status: HttpStatusCode.NOT_FOUND,
            message: 'User not found',
            data: null,
            error: null,
        });

    return res.status(200).json({
        status: HttpStatusCode.OK,
        message: 'User found',
        data: userObject,
        error: null,
    });
};
