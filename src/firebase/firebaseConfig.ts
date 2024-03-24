import { initializeApp } from 'firebase/app'
import { connectFirestoreEmulator, getFirestore } from 'firebase/firestore'
import { connectAuthEmulator, getAuth } from 'firebase/auth'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyCZ1W2DpsKlIhbBoN696nlM83LPxtutbeg',
  authDomain: 'chat-a5efb.firebaseapp.com',
  projectId: 'chat-a5efb',
  storageBucket: 'chat-a5efb.appspot.com',
  messagingSenderId: '445861615624',
  appId: '1:445861615624:web:71dfbdcdfbb70bef5dd9bd',
  measurementId: 'G-8X1835QPDV'
}

const app = initializeApp(firebaseConfig)

const auth = getAuth(app)
const db = getFirestore(app)
const storage = getStorage(app)

// connectAuthEmulator(auth, 'http://127.0.0.1:4000')
// if (window.location.hostname == 'localhost') {
//   connectFirestoreEmulator(db, '127.0.0.1', 8080)
// }

export { auth, db, storage }
