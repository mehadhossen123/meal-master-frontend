import React, { Children } from 'react';
import { AuthContext } from './AuthContext';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/firebase';

const AuthProvider = ({children}) => {
    
    // auth info is here 
    const userRegister=(email,password)=>{
        console.log(email,password)
        return createUserWithEmailAndPassword(auth,email,password)
    }
    const authInfo={
        userRegister,

    }
    return (
       <AuthContext value={authInfo}>{children}</AuthContext>
    );
};

export default AuthProvider;