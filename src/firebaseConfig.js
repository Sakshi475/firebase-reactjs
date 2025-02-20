// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyDbyCiL9Wxs3Zxcm7nKE6tvWQxmOksgXig",
    authDomain: "studentfirebase-3ca3d.firebaseapp.com",
  databaseURL: "https://studentfirebase-3ca3d-default-rtdb.firebaseio.com/",
    projectId: "studentfirebase-3ca3d",
    storageBucket: "studentfirebase-3ca3d.firebasestorage.app",
    messagingSenderId: "613331679739",
    appId: "1:613331679739:web:ba87f22824da1d196bb35e",
    measurementId: "G-08KN4MQV00"
  };

const app = initializeApp(firebaseConfig);
export const database = getDatabase(app); // ✅ Export Realtime Database
