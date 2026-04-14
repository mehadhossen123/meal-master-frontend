import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxios from '../hook/axios/useAxios';

const Report = () => {
  const publicAxios=useAxios();

  const {data:yearData}=useQuery({
    queryKey:[],
    queryFn:async()=>{
      const res=await publicAxios.get(`/meal/year`)
      return res?.data;
    }
  })
  console.log("year data is ",yearData);
    return (
      <div className="pt-20">
        <div>
          <h1 className='lg:text-4xl my-5 text-2xl text-center  font-bold '>
           
            Meal Distribution <span className='text-primary'>Overview</span>
          </h1>
        </div>
      </div>
    );
};

export default Report;