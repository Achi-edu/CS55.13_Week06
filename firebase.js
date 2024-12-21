import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCV8dJPRkpfYJuUQmlA0bG45borW-85gAs",
    authDomain: "devs-6b651.firebaseapp.com",
    projectId: "devs-6b651",
    storageBucket: "devs-6b651.firebasestorage.app",
    messagingSenderId: "225034892148",
    appId: "1:225034892148:web:f82ac3138b6da95782b221",
    measurementId: "G-5EC2HT6H2K"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
//const analytics = getAnalytics(app);