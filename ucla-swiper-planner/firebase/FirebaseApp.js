// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore} from "firebase/firestore"
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  // apiKey: "AIzaSyCYzeDm9US8f6C1fHTul2Djwk1SFvCIzUI",
  // authDomain: "swiper-no-swiping-ca90d.firebaseapp.com",
  // databaseURL: "https://swiper-no-swiping-ca90d-default-rtdb.firebaseio.com",
  // projectId: "swiper-no-swiping-ca90d",
  // storageBucket: "swiper-no-swiping-ca90d.appspot.com",
  // messagingSenderId: "766010906720",
  // appId: "1:766010906720:web:610e75cc5f204b3d9acb05",
  // measurementId: "G-F0J4NGV2E5"


  apiKey: process.env.NEXT_PUBLIC_FIREBASE_APIKEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTHDOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASEURL,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECTID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGEBUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGINGSENDERID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APPID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENTID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig); //retrieves our firebase using our api key

export default app; //exports it 

// Initialize Firestore
export const db = getFirestore(app);
