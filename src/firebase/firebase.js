import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
const firebaseConfig = {
    apiKey: "AIzaSyDllnuPZzoFxF-RSyB7_sSQuOQNByGK5JU",
    authDomain: "lovelyu-app.firebaseapp.com",
    projectId: "lovelyu-app",
    storageBucket: "lovelyu-app.appspot.com",
    messagingSenderId: "998021638197",
    appId: "1:998021638197:web:9262488582fee39b7ea97c",
    measurementId: "G-9H8CFMFBXW"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const projectAuth = firebase.auth();


export { projectAuth }
