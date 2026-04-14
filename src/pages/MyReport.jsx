import React, { use, useState } from "react";
import {
  FaUtensils,
  FaWallet,
  FaCoins,
  FaChartPie,
  FaCalculator,
  FaCalendarAlt,
  FaUser,
} from "react-icons/fa";
import { MdOutlineFastfood } from "react-icons/md";
import useMeal from "../hook/useMeal";
import Loading from "../component/Loading";
import useExpense from "../hook/useExpense";
import useRole from "../hook/useRole";
import useUsers from "../hook/axios/useUsers";
import { AuthContext } from "../auth/AuthContext";
import { motion } from "framer-motion";

const MyReport = () => {
  const { user } = use(AuthContext);
  const [selectedEmail, setSelectedEmail] = useState(user?.email);
  const [selectedMonth, setSelectedMonth] = useState(
    new Date().toISOString().substring(0, 7),
  );

  const {
    personalTotalMeals,
    personalMealLoading,
    allMealLoading,
    totalMeals,
  } = useMeal({ selectedEmail, month: selectedMonth });
  const {
    personalTotalExpense,
    allExpenses,
    allExpensesLoading,
    personalExpenseLoading,
  } = useExpense({ selectedEmail, month: selectedMonth });
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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-4 md:p-10 bg-[#f8fafc] min-h-screen"
    >
      {/* Header & Filters */}
      <div className="max-w-7xl mx-auto mb-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="space-y-1">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
              Personal <span className="text-indigo-600">Insights</span>
            </h2>
            <p className="text-slate-500 font-medium">
              Detailed summary of your mess activities.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto">
            {/* Month Picker */}
            <div className="w-full sm:w-auto flex items-center gap-3 bg-white border border-slate-200 p-3 rounded-2xl shadow-sm">
              <FaCalendarAlt className="text-indigo-500" />
              <div className="flex flex-col">
                <span className="text-[10px] uppercase font-bold text-slate-400">
                  Reporting Month
                </span>
                <input
                  type="month"
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(e.target.value)}
                  className="bg-transparent text-sm font-bold focus:outline-none text-slate-700 cursor-pointer"
                />
              </div>
            </div>

            {/* Manager View: User Selector */}
            {userRole === "manager" && (
              <div className="w-full sm:w-auto flex items-center gap-3 bg-white border border-slate-200 p-3 rounded-2xl shadow-sm">
                <FaUser className="text-emerald-500" />
                <div className="flex flex-col w-full">
                  <span className="text-[10px] uppercase font-bold text-slate-400">
                    View Member
                  </span>
                  <select
                    onChange={(e) => setSelectedEmail(e.target.value)}
                    value={selectedEmail}
                    className="bg-transparent text-sm font-bold focus:outline-none text-slate-700 cursor-pointer outline-none border-none p-0 h-auto min-h-0 select-sm"
                  >
                    <option value={user?.email}>Personal Report</option>
                    {users.map((u, i) => (
                      <option value={u?.email} key={i}>
                        {u?.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {/* Card: Total Meals */}
          <StatCard
            icon={<MdOutlineFastfood size={24} />}
            label="Total Meals"
            value={personalTotalMeals}
            color="orange"
          />

          {/* Card: Deposited Amount */}
          <StatCard
            icon={<FaWallet size={24} />}
            label="Total Deposit"
            value={`৳ ${personalTotalExpense}`}
            color="blue"
          />

          {/* Card: Final Balance */}
          <div
            className={`relative overflow-hidden p-6 rounded-[2rem] border transition-all duration-300 ${
              personalBalance >= 0
                ? "bg-white border-emerald-100"
                : "bg-red-50 border-red-100"
            }`}
          >
            <div className="flex items-center gap-4">
              <div
                className={`p-4 rounded-2xl ${personalBalance >= 0 ? "bg-emerald-50 text-emerald-600" : "bg-white text-red-600 shadow-sm"}`}
              >
                <FaCoins size={24} />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                  Net Balance
                </p>
                <h3
                  className={`text-3xl font-black ${personalBalance >= 0 ? "text-slate-800" : "text-red-600"}`}
                >
                  ৳ {personalBalance}
                </h3>
              </div>
            </div>
            <div
              className={`mt-4 text-[10px] font-bold uppercase px-3 py-1 rounded-full inline-block ${
                personalBalance >= 0
                  ? "bg-emerald-100 text-emerald-700"
                  : "bg-red-200 text-red-700"
              }`}
            >
              {personalBalance >= 0 ? "Account Clear" : "Balance Due"}
            </div>
          </div>
        </div>

        {/* Detailed Analysis Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Mess Summary */}
          <div className="bg-slate-900 text-white p-8 rounded-[2.5rem] shadow-xl relative overflow-hidden group">
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-3 bg-slate-800 rounded-xl text-indigo-400">
                  <FaChartPie />
                </div>
                <h4 className="text-xl font-bold">Monthly Mess Overview</h4>
              </div>
              <div className="space-y-5">
                <Row label="Total Mess Meals" value={totalMeals} />
                <Row label="Total Mess Costs" value={`৳ ${allExpenses}`} />
                <div className="flex justify-between items-center pt-4 border-t border-slate-700">
                  <span className="text-slate-400 font-medium">Meal Rate</span>
                  <span className="text-3xl font-black text-indigo-400">
                    ৳ {perMealCost}
                  </span>
                </div>
              </div>
            </div>
            <div className="absolute top-0 right-0 p-8 opacity-10 transition-transform group-hover:scale-110">
              <FaChartPie size={120} />
            </div>
          </div>

          {/* Individual Breakdown */}
          <div className="bg-indigo-600 text-white p-8 rounded-[2.5rem] shadow-xl relative overflow-hidden">
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-indigo-500 rounded-xl text-white">
                  <FaCalculator />
                </div>
                <h4 className="text-xl font-bold">Calculation Breakdown</h4>
              </div>
              <p className="text-indigo-100 text-sm mb-8 leading-relaxed max-w-sm">
                Individual cost is calculated by multiplying your total meals
                with the current meal rate.
              </p>
              <div className="bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/20">
                <div className="text-center">
                  <span className="text-xs uppercase tracking-[0.2em] text-indigo-100">
                    Your Calculated Cost
                  </span>
                  <h2 className="text-5xl font-black mt-2">
                    ৳ {personalMealCost}
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Reusable Stat Card Component
const StatCard = ({ icon, label, value, color }) => {
  const colorMap = {
    orange: "text-orange-500 bg-orange-50",
    blue: "text-blue-500 bg-blue-50",
  };
  return (
    <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-md transition-all">
      <div className="flex items-center gap-4">
        <div className={`p-4 rounded-2xl ${colorMap[color]}`}>{icon}</div>
        <div>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
            {label}
          </p>
          <h3 className="text-3xl font-black text-slate-800">{value}</h3>
        </div>
      </div>
    </div>
  );
};

// Reusable Row Component for Mess Summary
const Row = ({ label, value }) => (
  <div className="flex justify-between items-center pb-2 border-b border-slate-800/50">
    <span className="text-slate-400 font-medium">{label}</span>
    <span className="font-bold text-lg text-slate-200">{value}</span>
  </div>
);

export default MyReport;
