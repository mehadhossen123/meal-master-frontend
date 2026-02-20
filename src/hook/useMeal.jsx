import React, { use } from 'react';
import { AuthContext } from '../auth/AuthContext';
import { useQuery } from '@tanstack/react-query';
import useAxios from './axios/useAxios';

const useMeal = () => {
    const {user}=use(AuthContext)
    const publicAxios=useAxios()
     const { data: meals, isLoading } = useQuery({
       queryKey: ["meal", user?.email],
       enabled: !!user?.email,
       queryFn: async () => {
         const res = await publicAxios.get(`/meal?email=${user?.email}`);
         return res?.data;
       },
     });

      const totalMeals = meals.reduce((sum, meal) => {
        return (
          sum +
          parseFloat(meal.morning) +
          parseFloat(meal.noon) +
          parseFloat(meal.night)
        );
      }, 0);


    return {isLoading,totalMeals}
};

export default useMeal;