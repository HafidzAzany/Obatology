import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { obatAPI } from "../services/obatAPI";
import LoadingSpinner from "../components/LoadingSpinner";
import EmptyState from "../components/EmptyState";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";

export default function GroupDetail() {
  const { groupName } = useParams(); // sekarang groupName adalah ID grup
  const [groupNama, setGroupNama] = useState("");
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const loadData = async () => {
    try {
      setLoading(true);
      const obatData = await obatAPI.fetchObat();
      const grupData = await obatAPI.fetchGrupObat();

      const grup = grupData.find((g) => g.id === parseInt(groupName));
      if (!grup) throw new Error("Grup tidak ditemukan");

      const filteredObat = obatData.filter((obat) => obat.grup_id === grup.id);

      setGroupNama(grup.nama_grup);
      setMedicines(filteredObat);
    } catch (err) {
      setError("Gagal memuat data obat.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Yakin ingin menghapus obat ini?")) return;
    try {
      setLoading(true);
      await obatAPI.deleteObat(id);
      await loadData();
    } catch (err) {
      setError("Gagal menghapus obat.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [groupName]);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Group: {groupNama}</h2>
        <button
          onClick={() => navigate(-1)}
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold px-4 py-2 rounded-xl shadow"
        >
          Back to Groups
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="px-6 py-4">
          <h3 className="text-lg font-semibold mb-4">Daftar Obat</h3>

          {loading && <LoadingSpinner text="Memuat data obat..." />}
          {!loading && error && <EmptyState text={error} />}
          {!loading && medicines.length === 0 && <EmptyState text="Tidak ada obat dalam kelompok ini." />}

          {!loading && medicines.length > 0 && (
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama Obat</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Jumlah</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {medicines.map((obat, index) => (
                    <tr key={obat.id_obat}>
                      <td className="px-6 py-4 whitespace-nowrap">{index + 1}.</td>
                      <td className="px-6 py-4 whitespace-nowrap">{obat.nama_obat}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{obat.quantity}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button onClick={() => navigate(`/edit-obat/${obat.id_obat}`)}>
                          <AiFillEdit className="text-green-500 text-2xl hover:text-green-700" />
                        </button>
                        <button onClick={() => handleDelete(obat.id_obat)} className="ml-2">
                          <AiFillDelete className="text-red-500 text-2xl hover:text-red-700" />
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
