import { createStore, combineReducers, compose } from "redux";
import { reduxFirestore, firestoreReducer } from "redux-firestore";
import firebase from "firebase/app";

import "firebase/firestore";
import { reactReduxFirebase, firebaseReducer } from "react-redux-firebase";

const firebaseConfig = {
  apiKey: "AIzaSyC_X4FeystKjgU6HTS_H2V7LMd3GaFkPsg",
  authDomain: "reacttodolist-f083c.firebaseapp.com",
  databaseURL: "https://reacttodolist-f083c.firebaseio.com",
  projectId: "reacttodolist-f083c",
  storageBucket: "reacttodolist-f083c.appspot.com",
  messagingSenderId: "1025019513371"
};

//react redux firebase config
const rrfConfig = {
  userProfile: "users",
  userFireStoreForProfile: true
};

// Initialize firebase instance
firebase.initializeApp(firebaseConfig);

// Initialize other services on firebase instance
firebase.firestore();

// Add reactReduxFirebase enhancer when making store creator
const createStoreWithFirebase = compose(
  reactReduxFirebase(firebase, rrfConfig),
  reduxFirestore(firebase)
)(createStore);

// Add firebase to reducers
const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer
});

// Create store with reducers and initial state
const initialState = {};
const store = createStoreWithFirebase(
  rootReducer,
  initialState,
  compose(
    reactReduxFirebase(firebase),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
