import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { obatAPI } from "../services/obatAPI";
import LoadingSpinner from "../components/LoadingSpinner";
import EmptyState from "../components/EmptyState";

export default function MedicineGroups() {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const loadGroups = async () => {
    try {
      setLoading(true);
      const data = await obatAPI.fetchObat();
      
      // Group medicines by jenis
      const grouped = data.reduce((acc, obat) => {
        if (!acc[obat.jenis]) {
          acc[obat.jenis] = [];
        }
        acc[obat.jenis].push(obat);
        return acc;
      }, {});
      
      // Convert to array format
      const groupArray = Object.keys(grouped).map(jenis => ({
        groupName: jenis,
        medicines: grouped[jenis],
        count: grouped[jenis].length
      }));
      
      setGroups(groupArray);
    } catch (err) {
      setError("Gagal memuat data kelompok obat.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadGroups();
  }, []);

  const filteredGroups = groups.filter(group =>
    group.groupName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Inventory · Medicine Groups</h2>
        <button
          onClick={() => navigate("/add-group")}
          className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-4 py-2 rounded-xl shadow"
        >
          Add New Group
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-6">
        <div className="px-6 py-4">
          <h3 className="text-lg font-semibold mb-4">List of medicines groups</h3>
          
          <div className="relative mb-4">
            <input
              type="text"
              placeholder="Search Medicine Groups..."
              className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="absolute left-3 top-3.5 text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          {loading && <LoadingSpinner text="Memuat kelompok obat..." />}
          {!loading && error && <EmptyState text={error} />}
          {!loading && groups.length === 0 && <EmptyState text="Belum ada kelompok obat." />}

          {!loading && filteredGroups.length > 0 && (
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Group Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No of Medicines</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredGroups.map((group, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-medium text-gray-900">{group.groupName}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-gray-500">{group.count}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          onClick={() => navigate(`/group-detail/${group.groupName}`)}
                          className="text-emerald-600 hover:text-emerald-800 font-medium"
                        >
                          View Full Detail
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}