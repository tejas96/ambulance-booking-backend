import { Response } from 'express';
import { Hospital as HospitalModel, Http } from '../model';
import Admin from '../config/firebaseAdmin';

const Hospital = Admin.firestore().collection('Hospital');

/**
 *
 * @param req
 * @param res
 * @returns
 *
 * @description this controller will register the hospital into firebase db
 */
export const registerHospital = async (req: Http.MyRequest, res: Response) => {
    let responsePayload: Http.Response;
    const hospitalInformation: HospitalModel.HospitalRegistration = req.body;
    try {
        const dbRes = await Hospital.add(hospitalInformation);
        responsePayload = {
            data: dbRes.id,
            error: null,
            message: Http.HttpStatus.OK,
            status: Http.HttpStatusCode.OK,
        };
        return res.status(200).send(responsePayload);
    } catch (err: any) {
        responsePayload = {
            data: null,
            error: err.message,
            message: Http.HttpStatus.OK,
            status: Http.HttpStatusCode.OK,
        };
        return res.status(500).send(responsePayload);
    }
};

/**
 *
 * @param req
 * @param res
 * @returns
 *
 * @description this controller will get all the hospitals from the firebase db
 */
export const getHospitalsByCityName = async (
    req: Http.MyRequest,
    res: Response
) => {
    const { city } = req.query;
    const hospitals = await Hospital.where('location.city', '==', city).get();
    const response: Http.Response = {
        data: null,
        error: null,
        message: '',
        status: Http.HttpStatusCode.OK,
    };
    if (!hospitals.docs.length) {
        response.message = `No hospitals present in ${city}`;
        return res.status(Http.HttpStatusCode.NOT_FOUND).send(response);
    }
    const hospitalData: any = [];
    hospitals.docs.map((doc) => {
        const data = doc.data();
        if (data) {
            hospitalData.push({ id: doc.id, ...data });
        }
    });
    response.data = hospitalData;
    response.message = 'hospital fetch successfully';
    return res.status(Http.HttpStatusCode.OK).send(response);
};
