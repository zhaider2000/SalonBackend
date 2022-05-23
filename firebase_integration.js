const admin = require('firebase-admin');
const serviceAccount=require('./salonx-78c73-firebase-adminsdk-n2cm1-4d33f28000.json')


admin.initializeApp({
    credential:admin.credential.cert(serviceAccount)
})

module.exports=admin