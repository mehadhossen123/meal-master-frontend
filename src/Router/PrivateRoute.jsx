import React, { use } from 'react';
import { AuthContext } from '../auth/AuthContext';
import { Navigate, useLocation } from 'react-router';
import Loading from '../component/Loading';

const PrivateRoute = ({children}) => {
    const  {user,loading}=use(AuthContext);
     const location = useLocation();
    if(loading){
        return<Loading></Loading>
    }
   

    if(!user){
        return <Navigate to={"/auth/login"} state={{location}} ></Navigate>
    }

    return children
};

export default PrivateRoute;