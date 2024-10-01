import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB38qVssiSyHLnDcPa0wpDVDHbWKOcKet0",
  authDomain: "gaming-ecommerce-a7eac.firebaseapp.com",
  projectId: "gaming-ecommerce-a7eac",
  storageBucket: "gaming-ecommerce-a7eac.appspot.com",
  messagingSenderId: "816751403173",
  appId: "1:816751403173:web:db41a93886429d44c42d4c",
};

export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const provider = new GoogleAuthProvider();
export const storage = getStorage(app);
export const db = getFirestore(app);
