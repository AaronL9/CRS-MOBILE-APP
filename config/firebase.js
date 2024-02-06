import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import {
  initializeAuth,
  getReactNativePersistence,
  getAuth,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDJB-bymQaBnc7652spVsgk3XECtseOB4o",
  authDomain: "crime-reporting-system-2b1ea.firebaseapp.com",
  projectId: "crime-reporting-system-2b1ea",
  storageBucket: "crime-reporting-system-2b1ea.appspot.com",
  messagingSenderId: "6779483996",
  appId: "1:6779483996:web:21c81d2b43bda740b5b399",
  measurementId: "G-HJ2QQ64DJK",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

export const auth = getAuth(app);
export const storage = getStorage(app);
