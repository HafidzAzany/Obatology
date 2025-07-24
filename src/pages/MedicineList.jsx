import { useEffect, useState } from "react";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { obatAPI } from "../services/obatAPI";
import LoadingSpinner from "../components/LoadingSpinner";
import EmptyState from "../components/EmptyState";

export default function MedicineList() {
  const [obatList, setObatList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const loadObat = async () => {
    try {
      setLoading(true);
      const data = await obatAPI.fetchObat();
      setObatList(data);
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
      loadObat();
    } catch (err) {
      setError("Gagal menghapus obat.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadObat();
  }, []);

  const filteredObatList = obatList.filter((obat) =>
    `${obat.nama_obat} ${obat.grup_obat?.nama_grup || ""}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Manajemen Obat</h2>
        <button
          onClick={() => navigate("/tambah-obat")}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg text-sm shadow-md"
        >
          Tambah Obat
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-x-auto">
        <div className="px-4 py-3 border-b border-gray-200 flex justify-between items-center">
          <h3 className="text-base font-semibold text-gray-700">Daftar Obat ⚕️</h3>
          <input
            type="text"
            placeholder="🔍 Cari obat/grup..."
            className="p-2 text-sm border rounded-lg w-200"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {loading && <LoadingSpinner text="Memuat data obat..." />}
        {!loading && error && <EmptyState text={error} />}
        {!loading && filteredObatList.length === 0 && !error && (
          <EmptyState text="Tidak ada data obat yang cocok." />
        )}

        {!loading && filteredObatList.length > 0 && (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-blue-600">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase">#</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase">Nama Obat</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase">Jumlah</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase">Grup</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase">Aksi</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredObatList.map((obat, index) => (
                <tr key={obat.id_obat}>
                  <td className="px-4 py-4 text-sm text-gray-700">{index + 1}.</td>
                  <td className="px-4 py-4 text-sm font-medium text-gray-900">{obat.nama_obat}</td>
                  <td className="px-4 py-4 text-sm text-gray-700">{obat.quantity}</td>
                  <td className="px-4 py-4 text-sm text-gray-700">{obat.grup_obat?.nama_grup || "-"}</td>
                  <td className="px-4 py-4 text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => navigate(`/edit-obat/${obat.id_obat}`)}
                        className="p-1 rounded-full hover:bg-gray-100"
                        title="Edit Obat"
                      >
                        <AiFillEdit className="text-blue-500 text-lg hover:text-blue-700" />
                      </button>
                      <button
                        onClick={() => handleDelete(obat.id_obat)}
                        className="p-1 rounded-full hover:bg-gray-100"
                        title="Hapus Obat"
                      >
                        <AiFillDelete className="text-red-500 text-lg hover:text-red-700" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
