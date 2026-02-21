import { useQuery } from '@tanstack/react-query';
import React, { use } from 'react';
import { AuthContext } from '../auth/AuthContext';
import useAxios from './axios/useAxios';

const useExpense = () => {
    const publicAxios = useAxios();
    const { user } = use(AuthContext);

    // get personal expenses

    const {
      data: personalExpense = [],
      isLoading:personalExpenseLoading,
      refetch,
    } = useQuery({
      queryKey: ["expenses", user?.email],
      enabled: !!user?.email,
      queryFn: async () => {
        const res = await publicAxios.get(`/expenses?email=${user?.email}`);
        return res.data;
      },
    });

    // get all expenses 
    const {
      data: allExpense = [],
      isLoading:allExpensesLoading,
      refetch:allRefetch,
    } = useQuery({
      queryKey: ["expenses/all"],
     
      queryFn: async () => {
        const res = await publicAxios.get(`/expenses/all`);
        return res.data;
      },
    });
// calculate total expense
     const personalTotalExpense = personalExpense.reduce(
       (acc, current) => acc + parseFloat(current.price || 0),
       0,
     );
     const allExpenses = allExpense.reduce(
       (acc, current) => acc + parseFloat(current.price || 0),
       0,
     );


    return {
      refetch,
      personalExpenseLoading,
      personalTotalExpense,
      personalExpense,
      allExpense,
      allExpensesLoading,
      allRefetch,
      allExpenses,
    };
};

export default useExpense;