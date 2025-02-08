// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyBXWwtmlhQiNBrXivwFWk-70qqSNv2Rmos",
  authDomain: "sadam-sdm.firebaseapp.com",
  databaseURL: "https://sadam-sdm-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "sadam-sdm",
  storageBucket: "sadam-sdm.firebasestorage.app",
  messagingSenderId: "74322700926",
  appId: "1:74322700926:web:be8c96f1ed12e89d4cc62f",
  measurementId: "G-WT9ZTMVL4P"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
// const analytics = getAnalytics(app);