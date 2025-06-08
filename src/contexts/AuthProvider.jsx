import React, { useState } from 'react';
import { AuthContext } from './AuthContext';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import app from "../firebase/firebase_init"

const AuthProvider = ({children}) => {

    const auth = getAuth(app);

    const [user, setUser] = useState(null);

    const signUp = (email, password) =>{
        return createUserWithEmailAndPassword(auth , email , password)
    }

    const userInfo = {
        user,
        signUp,

    }

    return (
        <AuthContext value={userInfo}>
            {children}
        </AuthContext>
    );
};

export default AuthProvider;