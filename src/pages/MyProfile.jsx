import React, { use } from 'react';
import { AuthContext } from '../auth/AuthContext';
import { FaEnvelope, FaMapMarkerAlt, FaPhone, FaUserCircle } from 'react-icons/fa';
import { motion } from 'framer-motion';


const MyProfile = () => {
    const {user}=use(AuthContext)
    return (
      <div>
        <motion.div
        initial={{opacity:0,y:80}}
        animate={{opacity:1,y:0}}
        transition={{duration:0.9,ease:'easeInOut'}} className="min-h-screen bg-slate-50 p-4 md:p-10 font-sans text-slate-700">
          <div className="max-w-5xl mx-auto">
            {/* Profile Header Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden mb-8">
              {/* Banner */}
              <div className="h-40 bg-gradient-to-r from-blue-600 to-indigo-700"></div>

              <div className="px-8 pb-10">
                <div className="flex flex-col md:flex-row items-end -mt-16 gap-6">
                  {/* Profile Image Space */}
                  <div className="w-[250px] h-[220px] rounded-[2rem] bg-white p-2 shadow-xl">
                    <div className="w-full h-full rounded-2xl bg-slate-100 flex items-center justify-center overflow-hidden">
                      {/* User Image/Icon can go here */}
                      <img className='w-full h-full rounded-full' src={user?.photoURL} alt="photo is coming" />
                      <div className="text-slate-300 text-4xl font-bold italic">
                        {user?.name?.charAt(0) || "M"}
                      </div>
                    </div>
                  </div>

                  <div className="flex-1">
                    <div className="text-3xl font-extrabold text-slate-800 tracking-tight">
                      {user?.displayName || "Member Name"}
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <div className="px-3 py-1 bg-blue-50 text-blue-600 text-[10px] font-bold uppercase tracking-widest rounded-full border border-blue-100">
                        Premium Member
                      </div>
                      <div className="text-slate-400 text-sm font-medium italic">
                        {user?.email}
                      </div>
                    </div>
                  </div>

                  <div className="px-6 py-3 bg-slate-900 text-white rounded-2xl text-sm font-bold cursor-pointer hover:bg-slate-800 transition-all shadow-lg shadow-slate-200">
                    Edit Profile
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8 text-center">
              <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm">
                <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">
                  Total Meal
                </div>
                <div className="text-3xl font-black text-slate-800">45.5</div>
              </div>
              <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm">
                <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">
                  Balance
                </div>
                <div className="text-3xl font-black text-green-600">
                  ৳ 1,420
                </div>
              </div>
              <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm">
                <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">
                  Status
                </div>
                <div className="text-3xl font-black text-blue-600">Active</div>
              </div>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Info Card */}
              <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm">
                <div className="text-xl font-bold text-slate-800 mb-6 tracking-tight">
                  Contact Information
                </div>
                <div className="space-y-6">
                  <div className="flex justify-between items-center border-b border-slate-50 pb-4">
                    <div className="text-sm font-bold text-slate-400">
                      Personal Email
                    </div>
                    <div className="text-sm font-semibold text-slate-700">
                      {user?.email}
                    </div>
                  </div>
                  <div className="flex justify-between items-center border-b border-slate-50 pb-4">
                    <div className="text-sm font-bold text-slate-400">
                      Phone Number
                    </div>
                    <div className="text-sm font-semibold text-slate-700">
                      +880 1711-223344
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="text-sm font-bold text-slate-400">
                      Home Address
                    </div>
                    <div className="text-sm font-semibold text-slate-700 text-right">
                      Room 402, Mess Master Hall
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative Branding Card */}
              <div className="bg-indigo-600 rounded-[2rem] p-10 text-white relative overflow-hidden shadow-2xl shadow-indigo-200">
                <div className="relative z-10 h-full flex flex-col justify-between">
                  <div className="text-2xl font-black italic tracking-tighter">
                    MealMaster Pro
                  </div>
                  <div className="space-y-4 mt-6">
                    <div className="text-sm opacity-80 leading-relaxed">
                      Maintain your daily meals and expenses with ease. Your
                      account is synced with the manager's real-time database.
                    </div>
                    <div className="inline-block px-4 py-2 bg-white/20 backdrop-blur-md rounded-xl text-xs font-bold">
                      Member Since: Feb 2026
                    </div>
                  </div>
                </div>
                {/* Background Decorative Circle */}
                <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-white/10 rounded-full"></div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    );
};

export default MyProfile;