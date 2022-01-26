import admin from 'firebase-admin';
const serviceAccountFile = require('./college-projects-bf5f9-firebase-adminsdk-u9keq-da243f4906.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccountFile),
});

export default admin;
