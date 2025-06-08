import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, GithubAuthProvider, signOut } from "firebase/auth";
import app from "../firebase/firebase_init"

const AuthProvider = ({children}) => {

    const auth = getAuth(app);

    const googleProvider = new GoogleAuthProvider();
    const githubProvider = new GithubAuthProvider();

    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);

    const signUp = (email, password) =>{
        return createUserWithEmailAndPassword(auth , email , password)
    }

    const signWithGoogle = () =>{
        return signInWithPopup(auth, googleProvider)
    }

    const signWithGitHub = () =>{
        return signInWithPopup(auth, githubProvider)
    }

    const logOut = () =>{
        return signOut(auth)
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
        signWithGitHub,
        logOut,
        
    }

    return (
        <AuthContext value={userInfo}>
            {children}
        </AuthContext>
    );
};

export default AuthProvider;