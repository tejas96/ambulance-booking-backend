import * as yup from 'yup';
// import { UserRole } from '../model/User';

export const userRegisterSchema = yup.object().shape({
    firstName: yup.string().required('First name is required'),
    lastName: yup.string().required('Last name is required'),
    photoURL: yup.string().required('Photo is required'),
    gender: yup.string().required('Gender is required'),
    userRole: yup.string().required('User role is required'),
});
