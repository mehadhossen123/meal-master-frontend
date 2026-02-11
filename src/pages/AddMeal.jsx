import React from 'react';
import Logo from '../component/Logo';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
 

const AddMeal = () => {
  const {register,handleSubmit,formState:{errors}}=useForm()

  const handleAddMeal=(data)=>{
    console.log("this is details abot meal",data)
  }
    return (
      <div>
        <div className="max-w-lg mx-auto mt-10 p-8 bg-white rounded-2xl shadow-xl border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-800 mb-2 flex justify-center text-center">
            <Logo></Logo>
          </h2>
          <p className="text-sm text-gray-500 text-center mb-8">
            Enter meal count for the members
          </p>

          <form onSubmit={handleSubmit(handleAddMeal)}>
            {/* Member Selection */}
            <div className="form-control w-full mb-5">
              <label className="label">
                <span className="label-text font-bold text-gray-700">
                  Select Member
                </span>
              </label>
              <motion.select
                {...register("name", { required: true })}
                initial={{ opacity: 0, y: 70 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="select select-bordered w-full focus:ring-2 focus:ring-primary focus:outline-none bg-gray-50"
              >
                <option disabled selected>
                  Pick a member
                </option>
                <option>Mehad</option> {/* Dummy 1 */}
                <option>Mosaref</option>
                <option>Sakil</option>
                <option>Liton</option>
                <option>Riyaz</option>
                <option>Rasel</option>
                <option>Akash</option>
                <option>Mehedy</option>
                <option>Ali</option>
                <option>Ibrahim</option>
                <option>Tanvir</option>
                <option>Osman</option>
                <option>Hujur</option>
                <option>Jahir</option>
              </motion.select>
              {errors.name && (
                <span className="text-red-500">This field is required</span>
              )}
            </div>

            {/* Date Input */}
            <div className="form-control w-full mb-5">
              <label className="label">
                <span className="label-text font-bold text-gray-700">
                  Select Date
                </span>
              </label>
              <motion.input
                {...register("date", { required: true })}
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                type="date"
                className="input input-bordered w-full focus:ring-2 focus:ring-primary focus:outline-none bg-gray-50"
              />
              {errors.date && (
                <span className="text-red-500">This field is required</span>
              )}
            </div>

            {/* Meal Count Section (Three Columns) */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              {/* Morning */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-bold text-gray-600">
                    Morning
                  </span>
                </label>
                <motion.input
                  {...register("morning", { required: true })}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  type="number"
                  step="0.5"
                  placeholder="0"
                  className="input input-bordered w-full text-center focus:border-primary"
                />
                {errors.morning && (
                  <span className="text-red-500">This field is required</span>
                )}
              </div>
              {/* Noon */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-bold text-gray-600">
                    Noon
                  </span>
                </label>
                <motion.input
                  {...register("noon", { required: true })}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.9 }}
                  type="number"
                  step="0.5"
                  placeholder="0"
                  className="input input-bordered w-full text-center focus:border-primary"
                />
                {errors.noon && (
                  <span className="text-red-500">This field is required</span>
                )}
              </div>
              {/* Night */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-bold text-gray-600">
                    Night
                  </span>
                </label>
                <motion.input
                  {...register("night", { required: true })}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  type="number"
                  step="0.5"
                  placeholder="0"
                  className="input input-bordered w-full text-center focus:border-primary"
                />
                {errors.night && (
                  <span className="text-red-500">This field is required</span>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div className="form-control">
              <button type='submit' className="btn hover:bg-secondary btn-primary bg-primary w-full text-white shadow-md hover:shadow-lg transform transition active:scale-95">
                Confirm & Add Meal
              </button>
            </div>
          </form>
        </div>
      </div>
    );
};

export default AddMeal;