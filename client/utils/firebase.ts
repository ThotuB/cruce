import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyBmWOAFospYh8OOgiYxY3EYW9AvBq-TcMs",
    authDomain: "dp-cruce.firebaseapp.com",
    projectId: "dp-cruce",
    storageBucket: "dp-cruce.appspot.com",
    messagingSenderId: "884930862494",
    appId: "1:884930862494:web:cdf729b9fde8ea84b64a8f",
    measurementId: "G-6BEFRW5WHN",
}

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
export default app
