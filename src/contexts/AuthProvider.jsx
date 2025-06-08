import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from "firebase/auth";
import app from "../firebase/firebase_init"

const AuthProvider = ({children}) => {

    const auth = getAuth(app);

    const googleProvider = new GoogleAuthProvider();

    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);

    const signUp = (email, password) =>{
        return createUserWithEmailAndPassword(auth , email , password)
    }

    const signWithGoogle = () =>{
        return signInWithPopup(auth, googleProvider)
    }

    useEffect(() =>{
        const unsubscribe = onAuthStateChanged(auth, currentUser =>{
            setUser(currentUser);
            setLoading(false);
        })
        return () => unsubscribe();
    },[])

    const userInfo = {
        user,
        loading,
        signUp,
        signWithGoogle,

    }

    return (
        <AuthContext value={userInfo}>
            {children}
        </AuthContext>
    );
};

export default AuthProvider;