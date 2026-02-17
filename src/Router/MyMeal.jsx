import { useQuery } from '@tanstack/react-query';
import React, { use } from 'react';
import { AuthContext } from '../auth/AuthContext';
import useAxios from '../hook/axios/useAxios';

const MyMeal = () => {
    const {user}=use(AuthContext)
    const publicAxios=useAxios()
   const { data: userRole = "", isLoading: roleLoading } = useQuery({
     queryKey: ["user", user?.email],
     enabled: !!user?.email,
     queryFn: async () => {
       const res = await publicAxios.get(`/user?email=${user?.email}`);
       return res?.data?.role;
     },
   });
    return (
        <div>
            this is my meal route
            
        </div>
    );
};

export default MyMeal;