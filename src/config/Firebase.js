import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB0IfP8zJbP1FubKXNjcnaEf2_Ls67dWfE",
  authDomain: "info-ana.firebaseapp.com",
  projectId: "info-ana",
  storageBucket: "info-ana.appspot.com",
  messagingSenderId: "399048334467",
  appId: "1:399048334467:web:fa98d2175ccc2911b08fb6"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);