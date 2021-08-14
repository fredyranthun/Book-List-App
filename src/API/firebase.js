import firebase from "firebase/app";
import 'firebase/auth'
import 'firebase/database'

const app = firebase.initializeApp({
    apiKey: "AIzaSyBRVzoc1UWtNjlsVz3-2RYeTjnq2a492tU",
    authDomain: "auth-books.firebaseapp.com",
    databaseURL: 'https://auth-books-default-rtdb.firebaseio.com/',
    projectId: "auth-books",
    storageBucket: "auth-books.appspot.com",
    messagingSenderId: "333369334776",
    appId: "1:333369334776:web:b39a094e42693c877fd40d"
})


export const auth = app.auth()
export const database = app.database()

export default app;