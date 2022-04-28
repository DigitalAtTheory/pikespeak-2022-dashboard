import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const isServer = typeof window === "undefined";

const firebaseApiKey = isServer
  ? process.env.FIREBASE_API_KEY
  : window.env.FIREBASE_API_KEY;
const firebaseAuthDomain = isServer
  ? process.env.FIREBASE_AUTH_DOMAIN
  : window.env.FIREBASE_AUTH_DOMAIN;
const firebaseProjectId = isServer
  ? process.env.FIREBASE_PROJECT_ID
  : window.env.FIREBASE_PROJECT_ID;
const firebaseStorageBucket = isServer
  ? process.env.FIREBASE_STORAGE_BUCKET
  : window.env.FIREBASE_STORAGE_BUCKET;
const firebaseMessagingSenderId = isServer
  ? process.env.FIREBASE_MESSAGING_SENDER_ID
  : window.env.FIREBASE_MESSAGING_SENDER_ID;
const firebaseAppId = isServer
  ? process.env.FIREBASE_APP_ID
  : window.env.FIREBASE_APP_ID;

const firebaseConfig = {
  apiKey: firebaseApiKey,
  authDomain: firebaseAuthDomain,
  projectId: firebaseProjectId,
  storageBucket: firebaseStorageBucket,
  messagingSenderId: firebaseMessagingSenderId,
  appId: firebaseAppId,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore();

export { db };
