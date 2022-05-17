import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { GoogleAuthProvider, getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCiywLLtGlAUfbxuFJiNsqQw2tfZJQizVk",
  authDomain: "clone-slack-4bacd.firebaseapp.com",
  projectId: "clone-slack-4bacd",
  storageBucket: "clone-slack-4bacd.appspot.com",
  messagingSenderId: "249543588180",
  appId: "1:249543588180:web:345c7c4e212309edcf70c1",
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const auth = getAuth();
auth.languageCode = "it";
const provider = new GoogleAuthProvider();

export { db, auth, provider };
