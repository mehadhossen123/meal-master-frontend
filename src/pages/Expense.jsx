import React from "react";
import Logo from "../component/Logo";

const Expense = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-20 px-4">
      <div className="w-full max-w-lg bg-white rounded-xl shadow-lg p-6">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6 flex justify-center">
          <Logo></Logo> 
        </h1>

        <form className="space-y-4">
          {/* Product */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Product
            </label>
            <select className="w-full border rounded-md px-3 py-2">
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
            </select>
          </div>

          {/* Quantity & Unit */}
          <div className="flex gap-3">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Quantity
              </label>
              <input
                type="number"
                placeholder="e.g. 2"
                className="w-full border rounded-md px-3 py-2"
              />
            </div>

            <div className="w-28">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Unit
              </label>
              <select className="w-full border rounded-md px-2 py-2">
                <option>kg</option>
                <option>gram</option>
                <option>pcs</option>
                <option>litre</option>
              </select>
            </div>
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Total Price (৳)
            </label>
            <input
              type="number"
              placeholder="e.g. 450"
              className="w-full border rounded-md px-3 py-2"
            />
          </div>

          {/* Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Purchase Date
            </label>
            <input type="date" className="w-full border rounded-md px-3 py-2" />
          </div>

          {/* Note */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Note (optional)
            </label>
            <textarea
              placeholder="Extra information..."
              className="w-full border rounded-md px-3 py-2 resize-none"
              rows="3"
            />
          </div>

          {/* Button */}
          <button
            type="button"
            className="w-full bg-primary text-white py-2 rounded-md font-semibold transition"
          >
            Add Expense
          </button>
        </form>
      </div>
    </div>
  );
};

export default Expense;
