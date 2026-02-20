import React, { Children, useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import { auth } from '../firebase/firebase';


const AuthProvider = ({children}) => {
    const [user,setUser]=useState(null)
    const [loading,setLoading]=useState(true)
    const provider = new GoogleAuthProvider();
    // Google login  
    const userGoogleLogin=()=>{
        return signInWithPopup(auth,provider);
    }
    
    // userRegister
    const userRegister=(email,password)=>{
        setLoading(true)
        console.log(email,password)
        return createUserWithEmailAndPassword(auth,email,password)
    }

    // user login

    const userLogin=(email,password)=>{
        setLoading(true)
        return signInWithEmailAndPassword(auth,email,password);
    }

const logOut=()=>{
        setLoading(true)
        return signOut(auth)

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



    const authInfo = {
      userRegister,
      user,
      loading,
      userLogin,
      logOut,
      userGoogleLogin,
    };
    return (
       <AuthContext value={authInfo}>{children}</AuthContext>
    );
};

export default AuthProvider;