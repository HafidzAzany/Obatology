import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { obatAPI } from "../services/obatAPI";
import GenericTable from "../components/GenericTable";
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
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">Inventory · Medicine Groups</h2>
        <button
          onClick={() => navigate("/tambah-grup")}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-xl shadow-md"
        >
          Add New Group
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-700">List of Medicine Groups</h3>
        </div>

        {loading && <LoadingSpinner text="Memuat kelompok obat..." />}
        {!loading && error && <EmptyState text={error} />}
        {!loading && groups.length === 0 && <EmptyState text="Belum ada kelompok obat." />}

        {!loading && filteredGroups.length > 0 && (
          <GenericTable
            columns={["#", "Nama Grup", "Jumlah Obat", "Aksi"]}
            data={filteredGroups}
            renderRow={(group, index) => (
              <>
                <td className="px-6 py-3 text-sm">{index + 1}.</td>
                <td className="px-6 py-3 text-sm">{group.groupName}</td>
                <td className="px-6 py-3 text-sm">{group.count}</td>
                <td className="px-6 py-3 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => navigate(`/group-detail/${group.groupId}`)}
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
                    View Detail
                  </button>
                </td>
              </>
            )}
          />
        )}
      </div>
    </div>
  );
}
