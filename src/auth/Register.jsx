import React, { use, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";
import Logo from "../component/Logo";
import { useForm } from "react-hook-form";
import { AuthContext } from "./AuthContext";
import Swal from "sweetalert2";
import useAxios from "../axios/useAxios";
import { updateProfile } from "firebase/auth";
import { auth } from "../firebase/firebase";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { userRegister} = use(AuthContext);
  const [loading,setLoading]=useState(false)
  

  const axiosPublic = useAxios();

  const handleRegister = async (data) => {
    setLoading(true)
    // image upload and get link form image bb
    const imageFile = data.image[0];
    const api_key = import.meta.env.VITE_IMGBB_API_KEY;
    const image_hoisting_url = `https://api.imgbb.com/1/upload?key=${api_key}`;
    const formData = new FormData();
    formData.append("image", imageFile);
    // post image in the image bb
    const response = await fetch(image_hoisting_url, {
      method: "POST",
      body: formData,
    });
    const result = await response.json();
    const imageUrl = result.data.url;
   await userRegister(data.email, data.password)
      .then(async (res) => {
       await updateProfile(res.user,{
        displayName:data.name,
        photoURL:imageUrl
       });
        if (res.user) {
          
          const newUser = {
            name: data.name,
            email: data.email,
            image: imageUrl,

            role: "member",
          };
          const result = await axiosPublic.post("/user", newUser);
          if (result.data.insertedId) {
     
           
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "register successful",
              showConfirmButton: false,
              timer: 1500,
            });
          }
        }
      })
      .catch((err) => {
        console.log(err)
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: `${err}`,
          showConfirmButton: false,
          timer: 3000,
        });
      }).finally(()=>{
        setLoading(false)
      })
  };
  return (
    <div className="min-h-screen  flex items-center justify-center bg-gray-50 px-4 py-20">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-lg w-full bg-white rounded-3xl shadow-xl p-8 border border-gray-100"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center my-2 md:my-5">
            {" "}
            <Logo></Logo>
          </div>
          <h2 className="text-3xl font-bold text-gray-800 font-poppins">
            Create Account
          </h2>
          <p className="text-gray-500 mt-2">
            Start your mess management journey today
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit(handleRegister)}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {/* Full Name */}
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Full Name
            </label>
            <input
              {...register("name", { required: true })}
              type="text"
              placeholder="John Doe"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
              required
            />
            {errors.name && (
              <span className="text-red-500">This field is required</span>
            )}
          </div>

          {/* Email */}
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Email Address
            </label>
            <input
              {...register("email", { required: true })}
              type="email"
              placeholder="example@mail.com"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
              required
            />
            {errors.email && (
              <span className="text-red-500">This field is required</span>
            )}
          </div>
          {/* profile image is here  */}
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Profile image
            </label>
            <input
              {...register("image", { required: true })}
              type="file"
              className="file-input file-input-secondary w-full"
            />
            {errors.image && (
              <span className="text-red-500">This field is required</span>
            )}
          </div>

          {/* Password */}
          <div className="md:col-span-2">
            <label className=" block  text-sm font-semibold text-gray-700 mb-1">
              Password
            </label>
            <input
              {...register("password", { required: true })}
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
              required
            />
            {errors.password && (
              <span className="text-red-500">This field is required</span>
            )}
          </div>

          {/* Confirm Password */}

          {/* Register Button */}
          <div className="md:col-span-2 ">
            <motion.button
            disabled={loading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-secondary cursor-pointer text-white font-bold py-3 rounded-xl shadow-lg shadow-blue-200 hover:bg-blue-700 transition-colors"
            >
              {loading ? (
                <span className="loading loading-spinner"></span>
              ) : (
                "Sign Up Now"
              )}
            </motion.button>
          </div>

          {/* google login button */}

          <div className="md:col-span-2 mt-2">
            {" "}
            <button
              type="button"
              className="flex items-center justify-center gap-3 w-full bg-white text-black border border-[#e5e5e5] py-3 rounded-xl hover:bg-gray-50 transition-all font-medium"
            >
              <svg
                aria-label="Google logo"
                width="20"
                height="20"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <g>
                  <path d="m0 0H512V512H0" fill="#fff"></path>
                  <path
                    fill="#34a853"
                    d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                  ></path>
                  <path
                    fill="#4285f4"
                    d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                  ></path>
                  <path
                    fill="#fbbc02"
                    d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                  ></path>
                  <path
                    fill="#ea4335"
                    d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                  ></path>
                </g>
              </svg>
              sign up with Google
            </button>
          </div>
        </form>

        {/* Footer */}
        <p className="text-center text-gray-600 mt-6">
          Already have an account?{" "}
          <Link
            to={"/auth/login"}
            className="text-blue-600 font-bold hover:underline"
          >
            Log In now
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Register;
