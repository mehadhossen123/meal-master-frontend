import { updateProfile } from "firebase/auth";
import { motion } from "framer-motion";

import { useForm } from "react-hook-form";

import { auth } from "../firebase/firebase";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

const UpdateProfile = () => {
    const navigate=useNavigate();
   
     const {
        register, handleSubmit, reset,  
      } = useForm();
      const handleUpdate=async(data)=>{
       
      await updateProfile (auth.currentUser,{
        displayName:data?.name,
        photoURL:data?.photo

       })
       reset()
       navigate("/dashboard/my-profile");
        Swal.fire({
                     position: "center",
                     icon: "success",
                     title: "register successful",
                     showConfirmButton: false,
                     timer: 1500,
                   });
      
      }
  return (
    <div className="pt-20">
      <motion.div
        initial={{ opacity: 0, y: 80 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: "easeInOut" }}
        className="max-w-xl mx-auto mt-10 p-8 bg-white rounded-[2rem] shadow-xl border border-gray-100"
      >
        <div className="text-center mb-10">
          <div className="text-3xl font-black text-slate-800 tracking-tight">
            Update Profile
          </div>
          <div className="text-sm text-slate-400 mt-2 font-medium">
            Change your name and profile picture
          </div>
        </div>

        <form onSubmit={handleSubmit(handleUpdate)} className="space-y-6">
          {/* Name Input Group */}
          <div className="space-y-2">
            <div className="text-sm font-bold text-slate-700 ml-1">
              Full Name
            </div>
            <div className="relative">
              <input
                {...register("name", { required: true })}
                type="text"
                placeholder="Enter your name"
                className="w-full px-5 py-4 rounded-2xl border border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50 outline-none transition-all font-medium"
              />
            </div>
          </div>

          {/* Photo URL Input Group */}
          <div className="space-y-2">
            <div className="text-sm font-bold text-slate-700 ml-1">
              Photo URL
            </div>
            <div className="relative">
              <input
                {...register("photo", { required: true })}
                type="url"
                placeholder="https://example.com/image.jpg"
                className="w-full px-5 py-4 rounded-2xl border border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50 outline-none transition-all font-medium"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button type="submit" className="w-full  bg-indigo-600 text-white py-4 rounded-2xl font-bold text-center hover:bg-indigo-700 cursor-pointer shadow-lg shadow-indigo-100 transition-all active:scale-[0.98]">
              Save Changes
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default UpdateProfile;
