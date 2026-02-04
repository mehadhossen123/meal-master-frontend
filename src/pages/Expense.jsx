import React, { use, useState } from "react";
import Logo from "../component/Logo";
import { useForm } from "react-hook-form";
import useAxios from "../hook/axios/useAxios";
import { AuthContext } from "../auth/AuthContext";
import Swal from "sweetalert2";
import Loading from "../component/Loading";
import { motion } from "framer-motion";

const Expense = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const publicAxios = useAxios();
  const { user } = use(AuthContext);
  const [bLoading, setBLoading] = useState(false);

  //   Submit expense into database

  const handleExpense = async (data) => {
    try {
      setBLoading(true);
      const productDetails = {
        ...data,
        userEmail: user?.email,
        userName: user?.displayName,
      };
      if (!user?.email) {
        return;
      }
      const result = await publicAxios.post(
        `/expenses?email=${user?.email}`,
        productDetails,
      );

      if (result.data.insertedId) {
        setBLoading(false);
        reset();
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Expense Added successful",
          showConfirmButton: false,
          timer: 2000,
        });
      }
    } catch (error) {
      console.log(error.response);
      Swal.fire({
        position: "center",
        icon: "error",
        title: `${error?.response?.data?.message}`,
        showConfirmButton: false,
        timer: 2000,
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-20 px-4">
      <div className="w-full max-w-lg bg-white rounded-xl shadow-lg p-6">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6 flex justify-center">
          <Logo></Logo>
        </h1>

        <form onSubmit={handleSubmit(handleExpense)} className="space-y-4">
          {/* Product */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Product
            </label>
            <motion.select
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="w-full border rounded-md px-3 py-2"
              {...register("product", { required: true })}
            >
              <option>Select product</option>
              <option>Fish</option>
              <option>Chicken</option>
              <option>Beef</option>
              <option>Vegetables</option>
              <option>Lentils</option>
              <option>Turmeric</option>
              <option>Chili</option>
              <option>Egg</option>
              <option>Potato</option>
              <option>Oil</option>
              <option>Ginger</option>
              <option>Onion</option>
              <option>Garlic</option>
              <option>Spices</option>
            </motion.select>
            {errors.product && (
              <span className="text-red-500">This field is required</span>
            )}
          </div>

          {/* Quantity & Unit */}
          <div className="flex gap-3">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Quantity
              </label>
              <motion.input
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                {...register("quantity", { required: true })}
                type="number"
                placeholder="e.g. 2"
                className="w-full border rounded-md px-3 py-2"
              />
              {errors.quantity && (
                <span className="text-red-500">This field is required</span>
              )}
            </div>

            <div className="w-28">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Unit
              </label>
              <motion.select
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="w-full border rounded-md px-2 py-2"
                {...register("unit", { required: true })}
              >
                <option>kg</option>
                <option>gram</option>
                <option>pcs</option>
                <option>litre</option>
              </motion.select>
              {errors.unit && (
                <span className="text-red-500">This field is required</span>
              )}
            </div>
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Total Price (৳)
            </label>
            <motion.input
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              {...register("price", { required: true })}
              type="number"
              placeholder="e.g. 450"
              className="w-full border rounded-md px-3 py-2"
            />
            {errors.price && (
              <span className="text-red-500">This field is required</span>
            )}
          </div>

          {/* Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Purchase Date
            </label>
            <motion.input
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              type="date"
              {...register("date", { required: true })}
              className="w-full border rounded-md px-3 py-2"
            />
            {errors.date && (
              <span className="text-red-500">This field is required</span>
            )}
          </div>

          {/* Note */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Note (optional)
            </label>
            <motion.textarea
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              {...register("note", { required: true })}
              placeholder="Extra information..."
              className="w-full border rounded-md px-3 py-2 resize-none"
              rows="3"
            />
          </div>

          {/* Button */}
          <button
            disabled={bLoading}
            type="submit"
            className="w-full cursor-pointer bg-primary text-white py-2 rounded-md font-semibold transition"
          >
            {bLoading ? (
              <span className="loading loading-spinner"></span>
            ) : (
              " Add Expense"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Expense;
