import { useQuery } from '@tanstack/react-query';
import React, { use } from 'react';
import useAxios from '../hook/axios/useAxios';
import { AuthContext } from '../auth/AuthContext';


const MyExpense = () => {
    const publicAxios=useAxios();
    const {user}=use(AuthContext)
    const {data:allExpenses}=useQuery({
        queryKey:["expenses"],
        enabled:!!user?.email,
        queryFn:async ()=>{
            const res=await publicAxios.get(`/expenses?email=${user?.email}`)
            return res.data;
        }
    })
   
    return (
        <div className=''>
            this is my expense :{allExpenses}
            
        </div>
    );
};

export default MyExpense;