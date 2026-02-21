import React, { use, useState } from "react";
import {
  FaUtensils,
  FaWallet,
  FaCoins,
  FaChartPie,
  FaCalculator,
} from "react-icons/fa";
import { MdOutlineFastfood } from "react-icons/md";
import useMeal from "../hook/useMeal";
import Loading from "../component/Loading";
import useExpense from "../hook/useExpense";
import useRole from "../hook/useRole";
import useUsers from "../hook/axios/useUsers";
import { AuthContext } from "../auth/AuthContext";

const MyReport = () => {
    const { user } = use(AuthContext);
     const [selectedEmail, setSelectedEmail] = useState(user?.email);
  const {
    personalTotalMeals,
    personalMealLoading,
    allMealLoading,
    totalMeals,
  } = useMeal({selectedEmail});
  const {
    personalTotalExpense,
    allExpenses,
    allExpensesLoading,
    personalExpenseLoading,
  } = useExpense({selectedEmail});
  const { userRole } = useRole();
  const { users } = useUsers();
  
 
  

  if (
    allMealLoading ||
    personalMealLoading ||
    personalExpenseLoading ||
    allExpensesLoading
  ) {
    return <Loading />;
  }

  // Calculations
  const perMealCost =
    totalMeals > 0 ? (allExpenses / totalMeals).toFixed(2) : 0;
  const personalMealCost = Math.ceil(personalTotalMeals * perMealCost);
  const personalBalance = Math.ceil(personalTotalExpense - personalMealCost);

  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-10">
        <div className="mb-10 text-center md:text-left">
          <h2 className="text-3xl font-black text-slate-800 tracking-tight">
            Personal Insights
          </h2>
          <p className="text-slate-500 font-medium">
            Real-time summary of your meals and expenses.
          </p>
        </div>
        {userRole == "manager" && (
          <div>
            <legend className="py-2">Short by member name</legend>
            <select
              onChange={(e) => setSelectedEmail(e.target.value)}
              value={selectedEmail}
              defaultValue="Pick a text editor"
              className="select select-primary"
            >
              <option value={user?.email}>My own report</option>
              {users.map((user, i) => (
                <option value={user?.email} key={i}>
                  {user?.name}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
        {/* Card: Total Meals */}
        <div className="relative overflow-hidden bg-white p-6 rounded-[2.5rem] shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-5">
            <div className="p-4 bg-orange-50 text-orange-500 rounded-3xl">
              <MdOutlineFastfood size={28} />
            </div>
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                Your Total Meals
              </p>
              <h3 className="text-3xl font-black text-slate-800">
                {personalTotalMeals}
              </h3>
            </div>
          </div>
          <div className="absolute -right-4 -bottom-4 opacity-5 text-orange-500">
            <MdOutlineFastfood size={100} />
          </div>
        </div>

        {/* Card: Deposited Amount */}
        <div className="relative overflow-hidden bg-white p-6 rounded-[2.5rem] shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-5">
            <div className="p-4 bg-blue-50 text-blue-600 rounded-3xl">
              <FaWallet size={28} />
            </div>
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                Total Deposit
              </p>
              <h3 className="text-3xl font-black text-slate-800">
                ৳ {personalTotalExpense}
              </h3>
            </div>
          </div>
          <div className="absolute -right-4 -bottom-4 opacity-5 text-blue-600">
            <FaWallet size={100} />
          </div>
        </div>

        {/* Card: Final Balance */}
        <div
          className={`relative overflow-hidden p-6 rounded-[2.5rem] shadow-sm border border-gray-100 hover:shadow-md transition-shadow ${personalBalance >= 0 ? "bg-white" : "bg-red-50"}`}
        >
          <div className="flex items-center gap-5">
            <div
              className={`p-4 rounded-3xl ${personalBalance >= 0 ? "bg-green-50 text-green-600" : "bg-red-100 text-red-600"}`}
            >
              <FaCoins size={28} />
            </div>
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                Net Balance
              </p>
              <h3
                className={`text-3xl font-black ${personalBalance >= 0 ? "text-slate-800" : "text-red-600"}`}
              >
                ৳ {personalBalance}
              </h3>
            </div>
          </div>
          <div className="mt-2 text-xs font-semibold px-3 py-1 rounded-full inline-block bg-white/50">
            {personalBalance >= 0 ? "You're in Safe Zone" : "Need to Pay Dues"}
          </div>
        </div>
      </div>

      {/* Detailed Analysis Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Mess Summary Table-like Card */}
        <div className="bg-slate-900 text-white p-8 rounded-[3rem] shadow-2xl shadow-slate-200">
          <div className="flex items-center gap-3 mb-6">
            <FaChartPie className="text-indigo-400" />
            <h4 className="text-xl font-bold">Mess Summary</h4>
          </div>
          <div className="space-y-6">
            <div className="flex justify-between items-center border-b border-slate-700 pb-4">
              <span className="text-slate-400">Total Mess Meals</span>
              <span className="font-bold text-lg">{totalMeals}</span>
            </div>
            <div className="flex justify-between items-center border-b border-slate-700 pb-4">
              <span className="text-slate-400">Total Mess Costs</span>
              <span className="font-bold text-lg">৳ {allExpenses}</span>
            </div>
            <div className="flex justify-between items-center text-indigo-400 pt-2">
              <span className="text-lg font-bold">Current Meal Rate</span>
              <span className="text-2xl font-black">৳ {perMealCost}</span>
            </div>
          </div>
        </div>

        {/* Individual Calculation Insight */}
        <div className="bg-indigo-600 text-white p-8 rounded-[3rem] shadow-2xl shadow-indigo-100 relative">
          <div className="flex items-center gap-3 mb-6">
            <FaCalculator className="text-indigo-200" />
            <h4 className="text-xl font-bold">Cost Breakdown</h4>
          </div>
          <p className="text-indigo-100 text-sm mb-6 leading-relaxed">
            Based on the current mess expense of{" "}
            <span className="text-white font-bold">৳{allExpenses}</span> and
            total meals of{" "}
            <span className="text-white font-bold">{totalMeals}</span>, your
            individual share is calculated below.
          </p>
          <div className="bg-indigo-700/50 p-6 rounded-[2rem]">
            <div className="text-center">
              <span className="text-xs uppercase tracking-[0.2em] text-indigo-200">
                Your Actual Cost
              </span>
              <h2 className="text-4xl font-black mt-1">৳ {personalMealCost}</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyReport;
