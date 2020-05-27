import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = firebase.initializeApp({
  apiKey: "AIzaSyDan4yEyOghZN3BaywQnxCJELuJ1VbiFhg",
  authDomain: "task-manager-97331.firebaseapp.com",
  databaseURL: "https://task-manager-97331.firebaseio.com",
  projectId: "task-manager-97331",
  storageBucket: "task-manager-97331.appspot.com",
  messagingSenderId: "649564173800",
  appId: "1:649564173800:web:1583e736121e59fccee05d",
  measurementId: "G-PXJ1NTPJYZ",
});

export { firebaseConfig as firebase };
