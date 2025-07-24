import { useEffect, useState } from "react";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { obatAPI } from "../services/obatAPI";
import GenericTable from "../components/GenericTable";
import LoadingSpinner from "../components/LoadingSpinner";
import EmptyState from "../components/EmptyState";

export default function MedicineList() {
    const [obatList, setObatList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const loadObat = async () => {
        try {
            setLoading(true);
            const data = await obatAPI.fetchObat(); // Sudah include relasi grup
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

    return (
        <div className="w-full p-6">
        <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Manajemen Obat</h2>
            <button
                onClick={() => navigate("/tambah-obat")}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg md:rounded-xl text-sm md:text-base shadow-md transition duration-200"
            >
                Tambah Obat
            </button>
        </div>

        <div className="bg-white rounded-lg md:rounded-xl shadow-md border border-gray-200 overflow-x-auto">
            <div className="px-4 md:px-6 py-3 border-b border-gray-200">
                <h3 className="text-base md:text-lg font-semibold text-gray-700">Daftar Obat ⚕️</h3>
            </div>

            {loading && <LoadingSpinner text="Memuat data obat..." />}
            {!loading && error && <EmptyState text={error} />}
            {!loading && obatList.length === 0 && !error && <EmptyState text="Belum ada data obat." />}

            {!loading && obatList.length > 0 && (
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-blue-600"> {/* Warna diubah menjadi biru */}
                            <tr>
                                <th scope="col" className="px-4 md:px-6 py-3 text-left text-xs md:text-sm font-medium text-white uppercase tracking-wider">#</th>
                                <th scope="col" className="px-4 md:px-6 py-3 text-left text-xs md:text-sm font-medium text-white uppercase tracking-wider">Nama Obat</th>
                                <th scope="col" className="px-4 md:px-6 py-3 text-left text-xs md:text-sm font-medium text-white uppercase tracking-wider">Jumlah</th>
                                <th scope="col" className="px-4 md:px-6 py-3 text-left text-xs md:text-sm font-medium text-white uppercase tracking-wider">Grup</th>
                                <th scope="col" className="px-4 md:px-6 py-3 text-left text-xs md:text-sm font-medium text-white uppercase tracking-wider">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {obatList.map((obat, index) => (
                                <tr key={obat.id_obat}>
                                    <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm text-gray-700">{index + 1}.</td>
                                    <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{obat.nama_obat}</td>
                                    <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm text-gray-700">{obat.quantity}</td>
                                    <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm text-gray-700">{obat.grup_obat?.nama_grup || "-"}</td>
                                    <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm font-medium">
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
                </div>
            )}
        </div>
    </div>
    );
}
