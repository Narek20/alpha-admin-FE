import { initializeApp } from 'firebase/app'
import 'firebase/auth'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: process.env.firebaseApiKey,
  authDomain: process.env.firebaseAuthDomain,
  projectId: process.env.firebaseProjectId,
  storageBucket: process.env.firebaseBucketUrl,
}

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
