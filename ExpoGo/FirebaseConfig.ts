// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { initializeAuth, getReactNativePersistence} from "firebase/auth";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC41_QcR4QqxEZA1h5f7Ln3IspSCcOpl5A",
  authDomain: "pawparazzi-bearjeans.firebaseapp.com",
  projectId: "pawparazzi-bearjeans",
  storageBucket: "pawparazzi-bearjeans.firebasestorage.app",
  messagingSenderId: "452815221665",
  appId: "1:452815221665:web:544bac71e269ac20f811e0",
  measurementId: "G-G6FWS0W984"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
const analytics = getAnalytics(app);