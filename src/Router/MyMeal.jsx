import { useQuery } from '@tanstack/react-query';
import React, { use } from 'react';
import { AuthContext } from '../auth/AuthContext';
import useAxios from '../hook/axios/useAxios';
import Loading from '../component/Loading';

const MyMeal = () => {
    const {user}=use(AuthContext)
    const publicAxios=useAxios()
   const { data:meals, isLoading } = useQuery({
     queryKey: ["meal", user?.email],
     enabled: !!user?.email,
     queryFn: async () => {
       const res = await publicAxios.get(`/meal?email=${user?.email}`);
       return res?.data;
     },
   });
   if(isLoading){
    return <Loading></Loading>
   }
    return (
      <div>
        <h1 className="text-center md:text-4xl text-2xl font-bold mb-8">
          <span className="text-primary">Total </span> Meal List :
          <span className="text-secondary">{meals.length}</span>
        </h1>
      </div>
    );
};

export default MyMeal;