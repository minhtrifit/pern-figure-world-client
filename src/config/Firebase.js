import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIRE_BASE_API_KEY,
  authDomain: process.env.REACT_APP_FIRE_BASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIRE_BASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIRE_BASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIRE_BASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIRE_BASE_APP_ID,
};

const firebaseApp = initializeApp(firebaseConfig);

export const auth = getAuth(firebaseApp);
// export const db = getFirestore(firebaseApp);
