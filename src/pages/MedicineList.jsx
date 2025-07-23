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
        <div className="max-w-4xl mx-auto p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-gray-800">Manajemen Obat</h2>
                <button
                    onClick={() => navigate("/tambah-obat")}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-xl shadow-md transition duration-200 ease-in-out"
                >
                    Tambah Obat
                </button>
            </div>

            <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
                <div className="px-6 py-4 border-b border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-700">Daftar Obat ⚕️</h3>
                </div>

                {loading && <LoadingSpinner text="Memuat data obat..." />}
                {!loading && error && <EmptyState text={error} />}
                {!loading && obatList.length === 0 && !error && <EmptyState text="Belum ada data obat." />}

                {!loading && obatList.length > 0 && (
                    <GenericTable
                        columns={["#", "Nama Obat", "Jumlah", "Grup", "Aksi"]}
                        data={obatList}
                        renderRow={(obat, index) => (
                            <>
                                <td className="px-6 py-3 text-sm text-gray-700 whitespace-nowrap">{index + 1}.</td>
                                <td className="px-6 py-3 text-sm text-gray-900 whitespace-nowrap">{obat.nama_obat}</td>
                                <td className="px-6 py-3 text-sm text-gray-700 whitespace-nowrap">{obat.quantity}</td>
                                <td className="px-6 py-3 text-sm text-gray-700 whitespace-nowrap">{obat.grup_obat?.nama_grup || "-"}</td>
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
