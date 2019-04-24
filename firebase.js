import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

// Initialize Firebase
var config = {
  apiKey: "AIzaSyD1JC782fSrROyC5YtO_KurXfh5AHdKb7w",
  authDomain: "tim-tac-toe.firebaseapp.com",
  databaseURL: "https://tim-tac-toe.firebaseio.com",
  projectId: "tim-tac-toe",
  storageBucket: "tim-tac-toe.appspot.com",
  messagingSenderId: "1057222324252"
};
firebase.initializeApp(config);



export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();

export default firebase;

