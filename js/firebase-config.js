// Firebase Configuration for Madhu Crackers
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, doc, getDocs, getDoc, addDoc, updateDoc, deleteDoc, setDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyB5OqEPIhmMD5iHagDHE7LFdQKPaZAUKmE",
    authDomain: "manish-crackers.firebaseapp.com",
    projectId: "manish-crackers",
    storageBucket: "manish-crackers.firebasestorage.app",
    messagingSenderId: "694474710227",
    appId: "1:694474710227:web:3cf988f5ca44eee8910826",
    measurementId: "G-PSPCV8KFMD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

// Export everything
export {
    db,
    storage,
    auth,
    collection,
    doc,
    getDocs,
    getDoc,
    addDoc,
    updateDoc,
    deleteDoc,
    setDoc,
    ref,
    uploadBytes,
    getDownloadURL,
    deleteObject,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
};
