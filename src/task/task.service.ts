import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
admin.initializeApp()

const DB_Task = '/tasks'

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

//Function without async
export const createTask = functions.https.onRequest((request, response) => {
    console.log('On create');
    admin.firestore().doc(DB_Task).get()
        .then(snapshot => {
            const data = snapshot.data()
            response.send(data)
            response.statusMessage = 'Created Task'
        })
        .catch(error => {
            console.log(error)
            response.status(500).send(error)
        })
});

//Asynchronous method
export const getAllTask = functions.https.onRequest(async (request, response) => {
    try {
        console.log('getaAllTask');
        const tasks = await admin.firestore().doc(DB_Task).get()
        const data = tasks.data()
        response.send(data)
        response.statusMessage = 'Consulted All Task'
    }
    catch (error) {
        console.log(error)
        response.status(500).send(error)
    }
});