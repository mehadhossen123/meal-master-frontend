import React, { use } from 'react';
import { AuthContext } from '../auth/AuthContext';
import { useQuery } from '@tanstack/react-query';
import useAxios from './axios/useAxios';

const useMeal = ({ selectedEmail }) => {
  const { user } = use(AuthContext);
  const fetchEmail=selectedEmail|| user?.email
  const publicAxios = useAxios();
  const { data: meals, isLoading: personalMealLoading } = useQuery({
    queryKey: ["meal",fetchEmail],
    enabled: !!fetchEmail,
    queryFn: async () => {
      const res = await publicAxios.get(`/meal?email=${fetchEmail}`);
      return res?.data;
    },
  });

  const personalTotalMeals = (meals || []).reduce((sum, meal) => {
    return (
      sum +
      parseFloat(meal.morning) +
      parseFloat(meal.noon) +
      parseFloat(meal.night)
    );
  }, 0);

  const { data: allMeals, isLoading: allMealLoading } = useQuery({
    queryKey: ["meal/all"],

    queryFn: async () => {
      const res = await publicAxios.get(`/meal/all`);
      return res?.data;
    },
  });

  const totalMeals = (allMeals || []).reduce((sum, meal) => {
    return (
      sum +
      parseFloat(meal.morning) +
      parseFloat(meal.noon) +
      parseFloat(meal.night)
    );
  }, 0);

  return {
    personalMealLoading,
    personalTotalMeals,
    totalMeals,
    allMealLoading,
  };
};

export default useMeal;