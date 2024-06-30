import firebase from "firebase/app";
import "firebase/auth"

console.log(process.env.REACT_APP_FIREBASE_CONFIG)

const config = JSON.parse(process.env.REACT_APP_FIREBASE_CONFIG);

firebase.initializeApp(config)

export default firebase
