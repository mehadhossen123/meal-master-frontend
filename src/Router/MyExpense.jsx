import React, { use, useRef, useState } from "react";
import useAxios from "../hook/axios/useAxios";
import { AuthContext } from "../auth/AuthContext";
import {
  MdModeEditOutline,
  MdOutlineDeleteOutline,
  MdDateRange,
  MdShoppingBag,
} from "react-icons/md";
import Swal from "sweetalert2";
import Loading from "../component/Loading";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import useExpense from "../hook/useExpense";

const MyExpense = () => {
  const modalRef = useRef();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [updatedId, setUpdatedId] = useState(null);
  const [value, setValue] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(
    new Date().toISOString().substring(0, 7),
  );

  const { user } = use(AuthContext);
  const { refetch, isLoading, personalTotalExpense, personalExpense } =
    useExpense({ selectedEmail: user?.email, month: selectedMonth });

  const publicAxios = useAxios();

  if (isLoading) return <Loading />;

  // Delete Expense
  const handleExpenseDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#EF4444",
      cancelButtonColor: "#6B7280",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await publicAxios.delete(
            `/expenses/${id}?email=${user?.email}`,
          );
          if (res.data.result.deletedCount > 0) {
            refetch();
            Swal.fire("Deleted!", "Expense has been removed.", "success");
          }
        } catch (error) {
          Swal.fire("Error!", "Failed to delete.", "error");
        }
      }
    });
  };

  // Update Expense
  const handleUpdate = async (data) => {
    try {
      const res = await publicAxios.patch(
        `/expenses/${updatedId}?email=${user?.email}`,
        data,
      );
      if (res.data.result.acknowledged) {
        refetch();
        modalRef.current.close();
        Swal.fire({
          icon: "success",
          title: "Updated successfully",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="container mx-auto px-4 py-8 max-w-6xl"
    >
      {/* Header & Filter Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-primary/10 rounded-xl">
            <MdShoppingBag className="text-3xl text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800 tracking-tight">
              Expense Records
            </h1>
            <p className="text-gray-500 text-sm font-medium">
              Month: <span className="text-secondary">{selectedMonth}</span>
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
          {/* Month Selector UI */}
          <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 px-4 py-2 rounded-xl w-full sm:w-auto">
            <MdDateRange className="text-gray-400 text-xl" />
            <div className="flex flex-col">
              <span className="text-[10px] uppercase font-black text-gray-400">
                Filter Month
              </span>
              <input
                type="month"
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="bg-transparent text-sm font-bold focus:outline-none text-gray-700 cursor-pointer"
              />
            </div>
          </div>

          <div className="bg-secondary/10 px-4 py-2 rounded-xl border border-secondary/20 hidden sm:block">
            <p className="text-[10px] uppercase font-black text-secondary">
              Items
            </p>
            <p className="text-lg font-bold text-secondary leading-none">
              {personalExpense.length}
            </p>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead className="bg-gray-50/50">
              <tr className="text-gray-600 uppercase text-[12px] tracking-wider">
                <th className="py-5 px-6 text-center">#</th>
                <th className="py-5 px-6">Product</th>
                <th className="py-5 px-6 text-center">Quantity</th>
                <th className="py-5 px-6 text-center">Price</th>
                <th className="py-5 px-6 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {personalExpense.map((expense, i) => (
                <tr
                  key={expense._id}
                  className="hover:bg-blue-50/30 transition-all"
                >
                  <td className="py-4 text-center font-medium text-gray-400">
                    {i + 1}
                  </td>
                  <td className="py-4 font-bold text-gray-700">
                    {expense.product}
                  </td>
                  <td className="py-4 text-center">
                    <span className="px-3 py-1 bg-gray-100 rounded-full text-xs font-bold text-gray-600">
                      {expense.quantity} {expense.unit}
                    </span>
                  </td>
                  <td className="py-4 text-center font-black text-primary text-lg">
                    {expense.price}{" "}
                    <span className="text-xs font-normal">৳</span>
                  </td>
                  <td className="py-4">
                    <div className="flex justify-center gap-3">
                      <button
                        onClick={() => {
                          setValue(expense);
                          setUpdatedId(expense._id);
                          modalRef.current.showModal();
                        }}
                        className="p-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-600 hover:text-white transition-all shadow-sm"
                      >
                        <MdModeEditOutline className="text-xl" />
                      </button>
                      <button
                        onClick={() => handleExpenseDelete(expense._id)}
                        className="p-2 bg-red-50 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-all shadow-sm"
                      >
                        <MdOutlineDeleteOutline className="text-xl" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>

            {/* Total Footer */}
            {personalExpense.length > 0 && (
              <tfoot className="bg-gray-50/80">
                <tr>
                  <td
                    colSpan="3"
                    className="py-6 text-right font-bold text-gray-500 uppercase tracking-widest text-sm"
                  >
                    Monthly Total:
                  </td>
                  <td className="py-6 text-center">
                    <span className="text-2xl font-black text-secondary bg-secondary/10 px-4 py-2 rounded-xl">
                      {personalTotalExpense.toLocaleString()} ৳
                    </span>
                  </td>
                  <td></td>
                </tr>
              </tfoot>
            )}
          </table>
        </div>

        {personalExpense.length === 0 && (
          <div className="text-center py-20">
            <div className="bg-gray-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <MdShoppingBag className="text-4xl text-gray-300" />
            </div>
            <p className="text-gray-400 font-medium">
              No expenses found for this month.
            </p>
          </div>
        )}
      </div>

      {/* Modern Modal */}
      <dialog ref={modalRef} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box rounded-2xl p-8">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-black text-2xl text-gray-800">Edit Expense</h3>
            <button
              onClick={() => modalRef.current.close()}
              className="btn btn-sm btn-circle btn-ghost"
            >
              ✕
            </button>
          </div>

          <form onSubmit={handleSubmit(handleUpdate)} className="space-y-5">
            <div>
              <label className="text-xs font-bold text-gray-400 uppercase ml-1">
                Product
              </label>
              <select
                defaultValue={value?.product}
                className="select select-bordered w-full mt-1 focus:ring-primary"
                {...register("product", { required: true })}
              >
                <option>Fish</option>
                <option>Chicken</option>
                <option>Beef</option>
                <option>Vegetables</option>
                <option>Lentils</option>
                <option>Egg</option>
                <option>Potato</option>
                <option>Oil</option>
                <option>Onion</option>
                <option>Garlic</option>
                <option>Others</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-gray-400 uppercase ml-1">
                  Qty
                </label>
                <input
                  type="number"
                  defaultValue={value?.quantity}
                  className="input input-bordered w-full mt-1"
                  {...register("quantity", { required: true })}
                />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-400 uppercase ml-1">
                  Unit
                </label>
                <select
                  defaultValue={value?.unit}
                  className="select select-bordered w-full mt-1"
                  {...register("unit", { required: true })}
                >
                  <option>kg</option>
                  <option>gram</option>
                  <option>pcs</option>
                  <option>litre</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-gray-400 uppercase ml-1">
                Total Price (৳)
              </label>
              <input
                type="number"
                defaultValue={value?.price}
                className="input input-bordered w-full mt-1 font-bold text-primary"
                {...register("price", { required: true })}
              />
            </div>

            <div>
              <label className="text-xs font-bold text-gray-400 uppercase ml-1">
                Purchase Date
              </label>
              <input
                type="date"
                defaultValue={value?.date}
                className="input input-bordered w-full mt-1"
                {...register("date", { required: true })}
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="btn btn-primary w-full text-white font-bold text-lg rounded-xl shadow-lg shadow-primary/20"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </motion.div>
  );
};

export default MyExpense;
