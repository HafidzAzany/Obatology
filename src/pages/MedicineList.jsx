import React from "react";
import medicines from "../data/medicine.json"; // Import the JSON data

const MedicineList = () => {
  return (
    <div className="p-6 bg-white min-h-screen">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-xl font-semibold text-gray-700">
            Inventory › <span className="text-black">List of Medicines (298)</span>
          </h2>
          <p className="text-sm text-gray-500">List of medicines available for sales.</p>
        </div>
        <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
          + Add New Item
        </button>
      </div>

      <div className="flex items-center gap-4 mb-4">
        <input
          type="text"
          placeholder="Search Medicine Inventory.."
          className="px-3 py-2 border border-gray-300 rounded w-full max-w-sm"
        />
        <select className="px-3 py-2 border border-gray-300 rounded">
          <option>- Select Group -</option>
        </select>
      </div>

      <div className="overflow-auto">
        <table className="w-full bg-white shadow rounded">
          <thead className="bg-gray-200 text-left">
            <tr>
              <th className="p-3">Medicine Name</th>
              <th className="p-3">Medicine ID</th>
              <th className="p-3">Group Name</th>
              <th className="p-3">Stock in Qty</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {medicines.map((med, index) => (
              <tr key={index} className="border-t">
                <td className="p-3">{med.name}</td>
                <td className="p-3">{med.id}</td>
                <td className="p-3">{med.group}</td>
                <td className="p-3">{med.stock}</td>
                <td className="p-3 flex gap-2">
                  <button className="text-blue-600 hover:text-blue-800">
                    ✎
                  </button>
                  <button className="text-red-600 hover:text-red-800">
                    🗑️
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="text-sm text-gray-600 mt-4">
          Showing 1 - {medicines.length} results of 298
        </div>

        <div className="mt-2">
          <button className="border border-gray-300 px-3 py-1 rounded text-sm">
            Page 01 ▼
          </button>
        </div>
      </div>
    </div>
  );
};

export default MedicineList;