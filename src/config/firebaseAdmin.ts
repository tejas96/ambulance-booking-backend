import admin from 'firebase-admin';
const serviceAccountFile = require('./ambulance-booking-21fed-firebase-adminsdk-djtx0-a4b18c0170.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccountFile),
});

export default admin;
