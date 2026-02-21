import React, { use } from "react";
import { FaUtensils, FaWallet, FaCoins } from "react-icons/fa";
import useMeal from "../hook/useMeal";
import Loading from "../component/Loading";
import useExpense from "../hook/useExpense";

const MyReport = () => {
    const { personalTotalMeals, personalMealLoading, allMealLoading } =
      useMeal();
    const {
      personalTotalExpense,
      allExpenses,
      allExpensesLoading,
      personalExpenseLoading,
    } = useExpense();

    if (
      allMealLoading ||
      personalMealLoading ||
      personalExpenseLoading ||
      allExpensesLoading
    ) {
      return <Loading></Loading>;
    }
   
    console.log("total meal", personalTotalMeals);
    console.log("personal total expenses", personalTotalExpense);
    console.log("all expenses", allExpenses);
  return (
    <div className="">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Card 1: Total Meal */}
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="p-4 bg-blue-50 text-blue-600 rounded-2xl">
            <FaUtensils size={24} />
          </div>
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
              Total Meals
            </p>
            <h3 className="text-2xl font-black text-gray-800">45.0</h3>
          </div>
        </div>

        {/* Card 2: Total Expense */}
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="p-4 bg-red-50 text-red-500 rounded-2xl">
            <FaWallet size={24} />
          </div>
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
              Total Cost
            </p>
            <h3 className="text-2xl font-black text-gray-800">৳ 2,450</h3>
          </div>
        </div>

        {/* Card 3: Balance */}
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="p-4 bg-green-50 text-green-500 rounded-2xl">
            <FaCoins size={24} />
          </div>
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
              Balance
            </p>
            <h3 className="text-2xl font-black text-gray-800">৳ 550</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyReport;
