import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { obatAPI } from "../services/obatAPI";
import GenericTable from "../components/GenericTable";
import LoadingSpinner from "../components/LoadingSpinner";
import EmptyState from "../components/EmptyState";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";

export default function GroupDetail() {
  const { groupName } = useParams();
  const [groupNama, setGroupNama] = useState("");
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const loadData = async () => {
    try {
      setLoading(true);
      const [obatData, grupData] = await Promise.all([
        obatAPI.fetchObat(),
        obatAPI.fetchGrupObat(),
      ]);

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
          onClick={() => navigate("/medicine-groups")}
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold px-4 py-2 rounded-xl shadow"
        >
          Kembali ke Grup
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-700">Daftar Obat dalam Grup</h3>
        </div>

        {loading && <LoadingSpinner text="Memuat data..." />}
        {!loading && error && <EmptyState text={error} />}
        {!loading && medicines.length === 0 && <EmptyState text="Tidak ada obat dalam grup ini." />}

        {!loading && medicines.length > 0 && (
          <GenericTable
            columns={["#", "Nama Obat", "Jumlah", "Aksi"]}
            data={medicines}
            renderRow={(obat, index) => (
              <>
                <td className="px-6 py-3 text-sm">{index + 1}.</td>
                <td className="px-6 py-3 text-sm">{obat.nama_obat}</td>
                <td className="px-6 py-3 text-sm">{obat.quantity}</td>
                <td className="px-6 py-3 whitespace-nowrap text-sm font-medium">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => navigate(`/edit-obat/${obat.id_obat}`)}
                      className="p-1 rounded-full hover:bg-gray-100"
                      title="Edit Obat"
                    >
                      <AiFillEdit className="text-blue-500 text-xl hover:text-blue-700" />
                    </button>
                    <button
                      onClick={() => handleDelete(obat.id_obat)}
                      className="p-1 rounded-full hover:bg-gray-100"
                      title="Hapus Obat"
                    >
                      <AiFillDelete className="text-red-500 text-xl hover:text-red-700" />
                    </button>
                  </div>
                </td>
              </>
            )}
          />
        )}
      </div>
    </div>
  );
}
