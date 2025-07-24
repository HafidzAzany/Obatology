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
      const obatData = await obatAPI.fetchObat();
      const grupData = await obatAPI.fetchGrupObat();

      const grouped = grupData.map((grup) => {
        const relatedObat = obatData.filter((obat) => obat.grup_id === grup.id);
        return {
          groupId: grup.id,
          groupName: grup.nama_grup,
          count: relatedObat.length,
        };
      });

      setGroups(grouped);
    } catch (err) {
      setError("Gagal memuat data kelompok obat.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadGroups();
  }, []);

  const filteredGroups = groups.filter((group) =>
    group.groupName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Inventory · Medicine Groups</h2>
        <button
          onClick={() => navigate("/tambah-grup")}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg md:rounded-xl text-sm md:text-base shadow-md transition duration-200"
        >
          Add New Group
        </button>
      </div>

      <div className="bg-white rounded-lg md:rounded-xl shadow-md border border-gray-200 overflow-x-auto">
        <div className="px-4 md:px-6 py-3 border-b border-gray-200">
          <h3 className="text-base md:text-lg font-semibold text-gray-700">List of Medicine Groups</h3>
        </div>

        {loading && <LoadingSpinner text="Memuat kelompok obat..." />}
        {!loading && error && <EmptyState text={error} />}
        {!loading && groups.length === 0 && <EmptyState text="Belum ada kelompok obat." />}

        {!loading && filteredGroups.length > 0 && (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-blue-600">
                <tr>
                  <th scope="col" className="px-4 md:px-6 py-3 text-left text-xs md:text-sm font-medium text-white uppercase tracking-wider">#</th>
                  <th scope="col" className="px-4 md:px-6 py-3 text-left text-xs md:text-sm font-medium text-white uppercase tracking-wider">Nama Grup</th>
                  <th scope="col" className="px-4 md:px-6 py-3 text-left text-xs md:text-sm font-medium text-white uppercase tracking-wider">Jumlah Obat</th>
                  <th scope="col" className="px-4 md:px-6 py-3 text-left text-xs md:text-sm font-medium text-white uppercase tracking-wider">Aksi</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredGroups.map((group, index) => (
                  <tr key={group.groupId}>
                    <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm text-gray-700">{index + 1}.</td>
                    <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{group.groupName}</td>
                    <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm text-gray-700">{group.count}</td>
                    <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => navigate(`/group-detail/${group.groupId}`)}
                        className="text-blue-600 hover:text-blue-800 font-medium"
                      >
                        View Detail
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
  );
}