import React, { Children, useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth';
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

    const logOut=()=>{
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
     
    };
    return (
       <AuthContext value={authInfo}>{children}</AuthContext>
    );
};

export default AuthProvider;