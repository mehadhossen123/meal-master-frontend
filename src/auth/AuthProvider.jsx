import React, { Children, useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/firebase';


const AuthProvider = ({children}) => {
    const [user,setUser]=useState(null)
    const [loading,setLoading]=useState(true)
    
    // userRegister
    const userRegister=(email,password)=>{
        setLoading(true)
        console.log(email,password)
        return createUserWithEmailAndPassword(auth,email,password)
    }

    // user login

    const userLogin=(email,password)=>{
        return signInWithEmailAndPassword(auth,email,password);
    }

    //  onAuthStateChange observer
    useEffect(()=>{
        const unsubscribe=onAuthStateChanged(auth,(currentUser)=>{
           
                setUser(currentUser)
                setLoading(false)
            
        })
        return ()=>{
            return unsubscribe()
        }
    },[])



    const authInfo={
        userRegister,
        user,
        loading,
        userLogin

    }
    return (
       <AuthContext value={authInfo}>{children}</AuthContext>
    );
};

export default AuthProvider;