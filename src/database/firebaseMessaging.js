// BJoeTrqiHlVVUToLX2IRmPlT4n-lqI0bg7JDQAAKYetq81nYzkdCNfIbrVUg6_MpLdRx957eKWB-p4vRv1JTZoc

import {
    query, collection, doc,
    onSnapshot
} from '@firebase/firestore';
import db from './firebase';
import * as constants from '../constants';

import { getMessaging, getToken } from "firebase/messaging";

import { app } from './firebase'



const messaging = app.messaging

export const getTokenFn = (setTokenFound) => {
    return getToken(messaging, { vapidKey: 'BJoeTrqiHlVVUToLX2IRmPlT4n-lqI0bg7JDQAAKYetq81nYzkdCNfIbrVUg6_MpLdRx957eKWB-p4vRv1JTZoc' }).then((currentToken) => {
        if (currentToken) {
            console.log('current token for client: ', currentToken);
            setTokenFound(true);
            // Track the token -> client mapping, by sending to backend server
            // show on the UI that permission is secured
        } else {
            console.log('No registration token available. Request permission to generate one.');
            setTokenFound(false);
            // shows on the UI that permission is required 
        }
    }).catch((err) => {
        console.log('An error occurred while retrieving token. ', err);
        // catch error while creating client token
    });
}


//getToken(messaging, { vapidKey: "BJoeTrqiHlVVUToLX2IRmPlT4n-lqI0bg7JDQAAKYetq81nYzkdCNfIbrVUg6_MpLdRx957eKWB-p4vRv1JTZoc" })

/*
NOTIFICATION FUNCTIONS
*/


// export const workerAppliedGigsSubscription = (workerId) => {
//     const q = query(collection(
//         db,
//         constants.WORKERS + '/' + workerId + '/' + constants.APPLIED_GIGS
//     ));
//     const unsubscribe = onSnapshot(q, (querySnapshot) => {
//         const cities = [];
//         querySnapshot.forEach((doc) => {
//             cities.push(doc.data());
//         });
//         console.log("Current cities in CA: ", cities.join(", "));
//     });
// }


// //create a notification for the worker when a review is created

// export const workerReviewSub = (workerId) => {
//     const unsub = onSnapshot(doc(db, "workers", workerId), (doc) => {
//         console.log(" data in wrokerReviewSub: ", JSON.stringify(doc.data()));
//     });
// }

// // export const retrieveMessages = () => {

// //     onMessage(messaging, (payload) => {
// //         console.log('Message received. ', payload);
// //         // ...
// //     })
// // };

