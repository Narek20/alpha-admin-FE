import { initializeApp } from 'firebase/app'
import 'firebase/auth'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_BUCKET_URL,
}

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
