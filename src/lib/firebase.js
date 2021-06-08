import Firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCDx39aBuOamqU6ZjbKDTHHaczhtJ_F5IQ",
  authDomain: "mohibk-evernote.firebaseapp.com",
  projectId: "mohibk-evernote",
  storageBucket: "mohibk-evernote.appspot.com",
  messagingSenderId: "196365321766",
  appId: "1:196365321766:web:318e7b931e5ffbbe01c8e7",
};

const firebase = Firebase.initializeApp(firebaseConfig);
// const {FieldValue} = Firebase.firestore;

export { firebase };
