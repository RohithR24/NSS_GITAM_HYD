import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyB3ndIGsLMaz_vCzvPAXC0ZTo0veTKI1TA",
  authDomain: "nss-gitam-hyd.firebaseapp.com",
  projectId: "nss-gitam-hyd",
  storageBucket: "nss-gitam-hyd.appspot.com",
  messagingSenderId: "446046107120",
  appId: "1:446046107120:web:61df9194abf15a19285935",
  measurementId: "G-9JGCWL8V4P"
};

// Initialize Firebase only if no apps have been initialized
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

export { db };