import { useQuery } from '@tanstack/react-query';
import React, { use } from 'react';
import { AuthContext } from '../auth/AuthContext';
import useAxios from './axios/useAxios';

const useExpense = ({ selectedEmail }) => {
  const publicAxios = useAxios();
  const { user } = use(AuthContext);
  const fetchEmail=selectedEmail||user?.email;

  // get personal expenses

  const {
    data: personalExpense = [],
    isLoading: personalExpenseLoading,
    refetch,
  } = useQuery({
    queryKey: ["expenses", fetchEmail],
    enabled: !!fetchEmail,
    queryFn: async () => {
      const res = await publicAxios.get(`/expenses?email=${fetchEmail}`);
      return res.data;
    },
  });

  // get all expenses
  const {
    data: allExpense = [],
    isLoading: allExpensesLoading,
    refetch: allRefetch,
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