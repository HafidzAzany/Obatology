import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { obatAPI } from "../services/obatAPI";
import LoadingSpinner from "../components/LoadingSpinner";
import EmptyState from "../components/EmptyState";

export default function ReportPage() {
    const [laporanList, setLaporanList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const loadLaporan = async () => {
        try {
            setLoading(true);
            const data = await obatAPI.fetchLaporan();
            setLaporanList(data);
        } catch (err) {
            setError("Gagal memuat data laporan obat.");
        } finally {
            setLoading(false);
        }
    };

    const handleDownload = () => {
        const csvHeader = "Tanggal,Nama Obat,Jumlah Dipakai,Keterangan\n";
        const csvRows = laporanList.map((l) =>
            `${l.tanggal},${l.nama_obat},${l.jumlah_dipakai},"${l.keterangan || ""}"`
        );
        const blob = new Blob([csvHeader + csvRows.join("\n")], { type: "text/csv" });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `laporan-obat-${new Date().toISOString().split("T")[0]}.csv`;
        link.click();
    };

    useEffect(() => {
        loadLaporan();
    }, []);

    return (
        <div className="w-full p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
                    Laporan Penggunaan Obat
                </h2>
            </div>

            <div className="flex justify-between items-center mb-4">
                <button
                    onClick={() => navigate("/tambah-laporan")}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg text-sm shadow-md transition duration-200"
                >
                    Tambah Laporan
                </button>
                <button
                    onClick={handleDownload}
                    className="bg-blue-200 hover:bg-blue-300 text-gray-800 font-medium px-4 py-2 rounded-lg text-sm shadow-sm transition duration-200"
                >
                    Download CSV
                </button>
            </div>

            <div className="bg-white rounded-lg md:rounded-xl shadow-md border border-gray-200 overflow-x-auto">
                <div className="px-4 md:px-6 py-3 border-b border-gray-200">
                    <h3 className="text-base md:text-lg font-semibold text-gray-700">
                        Daftar Laporan Obat 💊
                    </h3>
                </div>

                {loading && <LoadingSpinner text="Memuat data laporan..." />}
                {!loading && error && <EmptyState text={error} />}
                {!loading && laporanList.length === 0 && !error && (
                    <EmptyState text="Belum ada laporan penggunaan obat." />
                )}

                {!loading && laporanList.length > 0 && (
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-blue-600">
                                <tr>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">#</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Tanggal</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Nama Obat</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Jumlah Dipakai</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Keterangan</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {laporanList.map((laporan, index) => (
                                    <tr key={laporan.id_laporan}>
                                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">{index + 1}</td>
                                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">{laporan.tanggal}</td>
                                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">{laporan.nama_obat}</td>
                                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">{laporan.jumlah_dipakai}</td>
                                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">{laporan.keterangan || "-"}</td>
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
