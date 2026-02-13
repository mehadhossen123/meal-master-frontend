import { useQuery } from "@tanstack/react-query";
import React, { use } from "react";
import useAxios from "../hook/axios/useAxios";
import { AuthContext } from "../auth/AuthContext";
import { MdModeEditOutline, MdOutlineDeleteOutline } from "react-icons/md";

const MyExpense = () => {
  const publicAxios = useAxios();
  const { user } = use(AuthContext);

  const { data: allExpenses = [], isLoading } = useQuery({
    queryKey: ["expenses", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await publicAxios.get(`/expenses?email=${user?.email}`);
      return res.data;
    },
  });

  // Total Expense Calculation 
  const totalExpense = allExpenses.reduce(
    (acc, current) => acc + parseFloat(current.price || 0),
    0,
  );
//   Loading state dekhano 

  if (isLoading) {
    return <div className="text-center mt-10">Loading Expenses...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      {/* Header Section */}
      <h1 className="text-center md:text-4xl text-2xl font-bold mb-8">
        <span className="text-primary">Total </span> Expense List:{" "}
        <span className="text-secondary">{allExpenses.length}</span>
      </h1>

      {/* Table Section */}
      <div className="overflow-x-auto shadow-lg rounded-lg">
        <table className="table w-full">
          {/* Table Head */}
          <thead className="bg-gray-100">
            <tr>
              <th className="text-center font-bold">#</th>
              <th className="text-center font-bold">Product Name</th>
              <th className="text-center font-bold">Quantity</th>
              <th className="text-center font-bold text-primary">Price</th>
              <th className="text-center font-bold">Action</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {allExpenses.map((expense, i) => (
              <tr key={expense._id} className="hover">
                <th className="text-center font-bold">{i + 1}</th>
                <td className="text-center font-bold">{expense.product}</td>
                <td className="text-center font-bold">
                  {expense.quantity} {expense.unit}
                </td>
                <td className="text-center font-bold">{expense.price} ৳</td>
                <td className="text-center font-bold">
                  <div className="flex justify-center gap-2">
                    <button onClick={()=>handleExpenseDelete(expense._id)} className="btn btn-sm bg-red-500 text-white hover:bg-red-700">
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
          {allExpenses.length > 0 && (
            <tfoot className="bg-gray-50">
              <tr>
                <th colSpan="3" className="text-right font-bold text-lg pt-4">
                  Total Cost:
                </th>
                <th className="text-center font-bold text-xl text-secondary pt-4 border-t-2">
                  {totalExpense.toLocaleString()} ৳
                </th>
                <th></th>
              </tr>
            </tfoot>
          )}
        </table>

        {/* Empty State */}
        {allExpenses.length === 0 && (
          <div className="text-center p-10 text-gray-500">
            No expenses found for this user.
          </div>
        )}
      </div>
    </div>
  );
};

export default MyExpense;
