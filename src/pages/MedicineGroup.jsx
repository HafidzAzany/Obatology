import React from "react";
import medicines from "../data/medicine.json";

const MedicineGroup = () => {
  // Hitung jumlah obat per grup
  const groupCounts = medicines.reduce((acc, medicine) => {
    acc[medicine.group] = (acc[medicine.group] || 0) + 1;
    return acc;
  }, {});

  // Konversi ke array untuk di-render
  const groups = Object.keys(groupCounts).map(groupName => ({
    name: groupName,
    count: groupCounts[groupName]
  }));

  return (
    <div className="p-6 bg-white min-h-screen">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-xl font-semibold text-gray-700">
            Inventory › <span className="text-black">Medicine Groups ({groups.length})</span>
          </h2>
          <p className="text-sm text-gray-500">List of medicines groups.</p>
        </div>
        <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
          + Add New Group
        </button>
      </div>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search Medicine Groups..."
          className="px-3 py-2 border border-gray-300 rounded w-full max-w-sm"
        />
      </div>

      <div className="overflow-auto">
        <table className="w-full bg-white shadow rounded">
          <thead className="bg-gray-200 text-left">
            <tr>
              <th className="p-3">Group Name</th>
              <th className="p-3">No of Medicines</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {groups.map((group, index) => (
              <tr key={index} className="border-t">
                <td className="p-3">{group.name}</td>
                <td className="p-3">{group.count}</td>
                <td className="p-3">
                  <button className="text-blue-600 hover:text-blue-800 underline">
                    View Full Detail
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MedicineGroup;