//import firebase from 'firebase';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { firebaseConfig } from './firebaseConfig.js'

export const firebaseApp = firebase.initializeApp(firebaseConfig);
export const firebaseDb = firebaseApp.firestore();
const settings = { timestampsInSnapshots: true };
firebaseDb.settings(settings);