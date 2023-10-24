import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCj-soCGeEo1lSrjpNh-1qJoAfR7kJR-HM",
  authDomain: "blogdev-sa.firebaseapp.com",
  projectId: "blogdev-sa",
  storageBucket: "blogdev-sa.appspot.com",
  messagingSenderId: "107770825701",
  appId: "1:107770825701:web:da3d9b1d6d28e97745bd0c",
  measurementId: "G-8P8RB6LHY4"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export {db};