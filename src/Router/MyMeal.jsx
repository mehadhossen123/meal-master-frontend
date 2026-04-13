import { useQuery } from "@tanstack/react-query";
import React, { use, useState } from "react";
import { AuthContext } from "../auth/AuthContext";
import useAxios from "../hook/axios/useAxios";
import Loading from "../component/Loading";
import {
  MdModeEditOutline,
  MdOutlineDeleteOutline,
  MdFilterList,
} from "react-icons/md";
import { motion } from "framer-motion";

const MyMeal = () => {
  const { user } = use(AuthContext);
  const [selectedMonth, setSelectedMonth] = useState(
    new Date().toISOString().substring(0, 7),
  );
  const publicAxios = useAxios();

  const { data: meals = [], isLoading } = useQuery({
    queryKey: ["meal", user?.email, selectedMonth],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await publicAxios.get(
        `/meal?email=${user?.email}&month=${selectedMonth}`,
      );
      return res?.data;
    },
  });

  if (isLoading) return <Loading />;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="container mx-auto px-4 py-8"
    >
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            My <span className="text-primary">Meal List</span>
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Total Records Found:{" "}
            <span className="font-bold text-secondary">{meals.length}</span>
          </p>
        </div>

        {/* Filter Bar - Responsive Design */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg border border-gray-200">
            <MdFilterList className="text-gray-400 text-xl" />
            <div className="flex flex-col">
              <span className="text-[10px] uppercase font-bold text-gray-400 leading-none">
                Filter Month
              </span>
              <input
                type="month"
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="bg-transparent text-sm font-semibold focus:outline-none text-gray-700 cursor-pointer"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
        <div className="overflow-x-auto">
          <table className="table w-full border-collapse">
            {/* Table Head */}
            <thead className="bg-gray-50 text-gray-600">
              <tr>
                <th className="py-4 px-4 text-center">#</th>
                <th className="py-4 px-4 text-center">Date</th>
                <th className="py-4 px-4 text-center">Morning</th>
                <th className="py-4 px-4 text-center">Noon</th>
                <th className="py-4 px-4 text-center">Night</th>
                <th className="py-4 px-4 text-center">Action</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {meals.length > 0 ? (
                meals.map((meal, i) => (
                  <tr
                    key={meal._id}
                    className="hover:bg-blue-50/30 transition-colors border-b border-gray-50"
                  >
                    <td className="py-4 text-center font-medium text-gray-500">
                      {i + 1}
                    </td>
                    <td className="py-4 text-center font-semibold text-gray-700">
                      {meal.date}
                    </td>
                    <td className="py-4 text-center font-bold text-blue-600">
                      {meal.morning}
                    </td>
                    <td className="py-4 text-center font-bold text-orange-600">
                      {meal.noon}
                    </td>
                    <td className="py-4 text-center font-bold text-indigo-800">
                      {meal.night}
                    </td>
                    <td className="py-4 text-center">
                      <div className="flex justify-center gap-2">
                        <button className="p-2 bg-red-50 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-all shadow-sm">
                          <MdOutlineDeleteOutline className="text-xl" />
                        </button>
                        <button className="p-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-600 hover:text-white transition-all shadow-sm">
                          <MdModeEditOutline className="text-xl" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="6"
                    className="text-center py-20 text-gray-400 font-medium italic"
                  >
                    No records found for the selected month.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
};

export default MyMeal;
