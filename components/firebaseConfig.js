import { getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBg3XQ3I9asRdoCOFulVG4ppbXUBek3_Jk",
    authDomain: "finsight-21f70.firebaseapp.com",
    projectId: "finsight-21f70",
    storageBucket: "finsight-21f70.firebasestorage.app",
    messagingSenderId: "448319592790",
    appId: "1:448319592790:web:1aff73d497a50cbaaf1ef7",
    measurementId: "G-71GYNMTP2J"
};


const app = getApps().length === 0
    ? initializeApp(firebaseConfig)
    : getApp();

const auth = getAuth(app);


export { app, auth };

