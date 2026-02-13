import { useQuery } from "@tanstack/react-query";
import React, { use, useRef } from "react";
import useAxios from "../hook/axios/useAxios";
import { AuthContext } from "../auth/AuthContext";
import { MdModeEditOutline, MdOutlineDeleteOutline } from "react-icons/md";
import Swal from "sweetalert2";
import Loading from "../component/Loading";
import { useForm } from "react-hook-form";

const MyExpense = () => {
  const publicAxios = useAxios();
  const { user } = use(AuthContext);

  const { data: allExpenses = [], isLoading ,refetch} = useQuery({
    queryKey: ["expenses", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await publicAxios.get(`/expenses?email=${user?.email}`);
      return res.data;
    },
  });
  const modalRef=useRef();
   const {
      register,
      handleSubmit,
      formState: { errors },
      
    } = useForm();

  // Total Expense Calculation 
  const totalExpense = allExpenses.reduce(
    (acc, current) => acc + parseFloat(current.price || 0),
    0,
  );
//   Loading state dekhano 

  if (isLoading) {
    return <Loading></Loading>
  }

 const handleExpenseDelete = (id) => {
   Swal.fire({
     title: "Are you sure?",
     text: "You won't be able to revert this!",
     icon: "warning",
     showCancelButton: true,
     confirmButtonColor: "#3085d6",
     cancelButtonColor: "#d33",
     confirmButtonText: "Yes, delete it!",
   }).then(async (result) => {
     if (result.isConfirmed) {
       try {
         // API কল
         const res = await publicAxios.delete(
           `/expenses/${id}?email=${user?.email}`,
         );
         console.log(res)

         
         if (res.data.result.deletedCount > 0) {
           refetch(); 
           Swal.fire({
             title: "Deleted!",
             text: "Your expense has been deleted.",
             icon: "success",
           });
         }
       } catch (error) {
         console.log(error.response);
         Swal.fire({
           icon: "error",
           title: "Oops...",
           text: error.response?.data?.message || "Something went wrong!",
         });
       }
     }
   });
 };

  return (
    <div className="container mx-auto p-4">
      {/* Header Section */}
      <h1 className="text-center md:text-4xl text-2xl font-bold mb-8">
        <span className="text-primary">Total </span> Expense List :
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
                    <button
                      onClick={() => handleExpenseDelete(expense._id)}
                      className="btn btn-sm bg-red-500 text-white hover:bg-red-700"
                    >
                      <MdOutlineDeleteOutline className="text-xl" />
                    </button>
                    <button
                      onClick={() => {
                        modalRef.current.showModal();
                      }}
                      className="btn btn-sm bg-green-500 text-white hover:bg-green-700"
                    >
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

      {/*Here is the modal  */}

      <dialog ref={modalRef} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Hello!</h3>
          {/* here is the form  */}
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
            
              type="submit"
              className="w-full hover:bg-secondary cursor-pointer bg-primary text-white py-2 rounded-md font-semibold transition"
            >
             update 
            </button>
          </form>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default MyExpense;
