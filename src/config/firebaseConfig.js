import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC_X4FeystKjgU6HTS_H2V7LMd3GaFkPsg",
  authDomain: "reacttodolist-f083c.firebaseapp.com",
  databaseURL: "https://reacttodolist-f083c.firebaseio.com",
  projectId: "reacttodolist-f083c",
  storageBucket: "reacttodolist-f083c.appspot.com",
  messagingSenderId: "1025019513371"
};

// Initialize firebase instance
firebase.initializeApp(firebaseConfig);
firebase.firestore();

export default firebase;
