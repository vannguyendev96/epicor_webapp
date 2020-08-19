import firebase from 'firebase'

const config = {
    apiKey: "AIzaSyD7XD9iseNW8ghv2y1GeDO-D_yTJIYCXo4",
    authDomain: "fir-finish.firebaseapp.com",
    databaseURL: "https://fir-finish.firebaseio.com",
    projectId: "fir-finish",
    storageBucket: "fir-finish.appspot.com",
    messagingSenderId: "607327817909",
    appId: "1:607327817909:web:839cce44094c2b622c2efc",
    measurementId: "G-0R326TLTGH"
}

firebase.initializeApp(config)

export default firebase