// Import the functions you need from the SDKs you need
//import {initializeApp} from 'firebase/app';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
//import {getAnalytics} from 'firebase/analytics';
//import {getFirestore, collection, getDocs} from 'firebase/firestore/lite';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: 'AIzaSyCHGDNAIwnWe9X9UfAowG8XXVREkcEioIE',
    authDomain: 'onemasterfigmaplugin.firebaseapp.com',
    projectId: 'onemasterfigmaplugin',
    storageBucket: 'onemasterfigmaplugin.appspot.com',
    messagingSenderId: '318343457042',
    appId: '1:318343457042:web:ff5aaa77ee0b5b701cebcb',
    measurementId: 'G-7ZKDTGW7TK',
};

class Firebase {
    constructor() {
        firebase.initializeApp(firebaseConfig);
        this.projectFirestore = firebase.firestore();
    }
    // Initialize Firebase

    async CheckUserLicense(user) {
        console.log('Geldi', user);
        const cadsRef = this.projectFirestore.collection('license');
        const result = [];
        const snapshot = await cadsRef
            .where('user', '==', user)
            //.orderBy('createDate', 'desc')
            //.startAt(1)
            //.limit(5)
            .get();

        if (snapshot.empty) {
            //console.log('No such document!');
            return false;
        } else {
            //return snapshot.docs.map((doc) => doc.data());
            /*
            snapshot.forEach((doc) => {
                console.log(doc.id, '=>', doc.data());
            });
            return result;
            */
            return true;
        }
    }

    async CheckLicenseNumber(number) {
        const cadsRef = this.projectFirestore.collection('key');
        const result = [];
        const snapshot = await cadsRef.where('keyid', '==', number).where('isused', '==', false).get();

        if (snapshot.empty) {
            return false;
        } else {
            snapshot.forEach((doc) => {
                console.log(doc.id, '=>', doc.data());
            });
            return result;

            //            return true;
        }
    }

    async AddLicense(user, key) {
        const newLicense = {
            license: key,
            user: user,
            type: 'lifetime',
        };
        const res = this.projectFirestore
            .collection('license')
            .add(newLicense)
            .then((result) => {
                console.log('Adsresult', result.id);
                //return result.id;
                this.UpdateKeyStatus(key);
            });
    }

    async UpdateKeyStatus(key) {
        const cadsRef = this.projectFirestore.collection('key');
        const result = [];
        const snapshot = await cadsRef.where('keyid', '==', key).where('isused', '==', false).get();
        if (!snapshot.empty) {
            var keyid = snapshot.docs[0].id;
            //console.log('snapshot', snapshot.docs[0].id);
            const cadsRef = this.projectFirestore.collection('key').doc(keyid);
            await cadsRef.update({
                isused: true,
            });
        }
    }
}

export default new Firebase();
