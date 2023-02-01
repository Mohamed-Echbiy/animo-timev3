// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBwYF6O6ATsQtBnSg8r9jHecB-pC6Bi4cA",
  authDomain: "animo-time.firebaseapp.com",
  projectId: "animo-time",
  storageBucket: "animo-time.appspot.com",
  messagingSenderId: "738745862579",
  appId: "1:738745862579:web:a649f84890d1fd0607e3c6",
  measurementId: "G-JVJM8HLC68",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const initFirebase = () => {
  return app;
};
