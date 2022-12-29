import { initializeApp } from "firebase/app";
import { getFirestore} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD8032juYGeaui128O_tNcI7nMJ4U3FK8k",
  authDomain: "facebook-messenger-clone-47337.firebaseapp.com",
  projectId: "facebook-messenger-clone-47337",
  storageBucket: "facebook-messenger-clone-47337.appspot.com",
  messagingSenderId: "1012534253035",
  appId: "1:1012534253035:web:a99e75467a3607c97d75ae",
  measurementId: "G-7LXN8FRHYC"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
 