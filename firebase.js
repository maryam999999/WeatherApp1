import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyC_s6UlZJZARH-3_M0g45XQQ1bamtqKF3Y",
    authDomain: "weatherapp-60cfd.firebaseapp.com",
    projectId: "weatherapp-60cfd",
    storageBucket: "weatherapp-60cfd.appspot.com",
    messagingSenderId: "53851212677",
    appId: "1:53851212677:web:d27cab2c251994ab5312ec",
    measurementId: "G-3WWY0DXB7D"
  };
  

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = getFirestore();

export {auth,db};