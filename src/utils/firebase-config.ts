import { initializeApp } from "firebase/app";
import { getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";

// const firebaseConfig = {
//     apiKey: process.env.FIREBASE_API_KEY,
//     authDomain: process.env.FIREBASE_AUTH_DOMAIN,
//     projectId: process.env.FIREBASE_PROJECT_ID,
//     storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
//     messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
//     appId: process.env.FIREBASE_APP_ID,
//     measurementId: process.env.FIREBASE_MEASUREMENT_ID
// };

const firebaseConfig = {
  apiKey: "AIzaSyCFvJxliqJ463lvSjlAV2xVBwNzlF5SIQg",
  authDomain: "bookingsystem-asuuk0802.firebaseapp.com",
  projectId: "bookingsystem-asuuk0802",
  storageBucket: "bookingsystem-asuuk0802.appspot.com",
  messagingSenderId: "201544255642",
  appId: "1:201544255642:web:c02340e179beb217227723"
  };



const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, GoogleAuthProvider };