import { useQuery } from "@tanstack/react-query";
import React, { use, useState } from "react";
import { AuthContext } from "../auth/AuthContext";
import useAxios from "../hook/axios/useAxios";
import Loading from "../component/Loading";
import { MdModeEditOutline, MdOutlineDeleteOutline } from "react-icons/md";
import { motion } from "framer-motion";



const MyMeal = () => {
  const { user } = use(AuthContext);
  const [selectedMonth,setSelectedMonth]=useState(new Date().toISOString().substring(0,7))
  console.log("member want to see : ",selectedMonth)
  const publicAxios = useAxios();
  const { data: meals=[], isLoading } = useQuery({
    queryKey: ["meal", user?.email,selectedMonth],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await publicAxios.get(`/meal?email=${user?.email}&month=${selectedMonth}`);
      return res?.data;
    },
  });

  if (isLoading) {
    return <Loading></Loading>;
  }
  return (
    <motion.div
      initial={{ opacity: 0, y: 80 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease: "easeInOut" }}
    >
      <h1 className="text-center md:text-4xl text-2xl font-bold mb-8">
        <span className="text-primary">Total </span> Meal List :
        <span className="text-secondary">{meals.length}</span>
      </h1>

      {/*  here is the date bar  */}
      <div>
        <legend className="py-2">Short by date </legend>
        <input type="month" value={selectedMonth} className="input input-border input-primary" onChange={(e)=>setSelectedMonth(e.target.value)} class="input" />
      </div>

      <div className="overflow-x-auto shadow-lg rounded-lg">
        <table className="table w-full">
          {/* Table Head */}
          <thead className="">
            <tr>
              <th className="text-center  font-bold">#</th>
              <th className="text-center  font-bold">Date</th>
              <th className="text-center  font-bold">Morning</th>
              <th className="text-center  font-bold ">Noon</th>
              <th className="text-center  font-bold">Night</th>
              <th className="text-center  font-bold">Action</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {meals.map((meal, i) => (
              <tr key={meal._id} className="hover">
                <th className="text-center font-bold">{i + 1}</th>
                <td className="text-center font-bold">{meal.date}</td>
                <td className="text-center font-bold">{meal.morning}</td>
                <td className="text-center font-bold">{meal.noon}</td>
                <td className="text-center font-bold">{meal.night}</td>
                <td className="text-center font-bold">
                  <div className="flex justify-center gap-2">
                    <button className="btn btn-sm bg-red-500 text-white hover:bg-red-700">
                      <MdOutlineDeleteOutline className="text-xl" />
                    </button>
                    <button className="btn btn-sm bg-green-500 text-white hover:bg-green-700">
                      <MdModeEditOutline className="text-xl" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>

          {/* Table Footer - This aligns Total Cost exactly under Price */}
        </table>

        {/* Empty State */}
      </div>
    </motion.div>
  );
};

export default MyMeal;
