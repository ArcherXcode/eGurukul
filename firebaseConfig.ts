import { initializeApp } from "firebase/app";
import { getAuth, getReactNativePersistence, initializeAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyBz8pu-gM1OayRzFI9nZO3iwHMi_u6Txl0",
  authDomain: "egurukul-cms.firebaseapp.com",
  projectId: "egurukul-cms",
  storageBucket: "egurukul-cms.appspot.com",
  messagingSenderId: "1035626804092",
  appId: "1:1035626804092:web:59666fe646d36be490eaf9"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = initializeAuth(FIREBASE_APP, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
export const FIRESTORE_DB = getFirestore(FIREBASE_APP);
