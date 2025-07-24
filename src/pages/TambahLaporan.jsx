import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { obatAPI } from "../services/obatAPI";
import AlertBox from "../components/AlertBox";

export default function TambahLaporan() {
    const [tanggal, setTanggal] = useState(new Date().toISOString().split("T")[0]);
    const [obatList, setObatList] = useState([]);
    const [selectedNamaObat, setSelectedNamaObat] = useState("");
    const [jumlah, setJumlah] = useState("");
    const [keterangan, setKeterangan] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        obatAPI.fetchObat()
            .then(data => setObatList(data.map(obat => obat.nama_obat))) // Ambil hanya nama
            .catch(() => setError("Gagal mengambil daftar obat"));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!selectedNamaObat || !jumlah) {
            setError("Semua field wajib diisi.");
            return;
        }

        try {
            setError("");

            const dataLaporan = {
                tanggal,
                nama_obat: selectedNamaObat,
                jumlah_dipakai: parseInt(jumlah),
                keterangan
            };

            await obatAPI.tambahLaporan(dataLaporan);
            setSuccess("Laporan berhasil ditambahkan!");

            setTimeout(() => navigate("/laporan"), 1200);
        } catch (err) {
            console.error(err);
            setError("Gagal menyimpan laporan.");
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-6">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">Tambah Laporan Obat</h2>
            {error && <AlertBox type="error">{error}</AlertBox>}
            {success && <AlertBox type="success">{success}</AlertBox>}

            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="date"
                    value={tanggal}
                    onChange={(e) => setTanggal(e.target.value)}
                    className="w-full p-3 border rounded-xl"
                    required
                />

                <select
                    value={selectedNamaObat}
                    onChange={(e) => setSelectedNamaObat(e.target.value)}
                    className="w-full p-3 border rounded-xl"
                    required
                >
                    <option value="">Pilih Obat</option>
                    {obatList.map((nama, index) => (
                        <option key={index} value={nama}>
                            {nama}
                        </option>
                    ))}
                </select>

                <input
                    type="number"
                    placeholder="Jumlah Dipakai"
                    value={jumlah}
                    onChange={(e) => setJumlah(e.target.value)}
                    className="w-full p-3 border rounded-xl"
                    required
                />

                <textarea
                    placeholder="Keterangan (opsional)"
                    value={keterangan}
                    onChange={(e) => setKeterangan(e.target.value)}
                    className="w-full p-3 border rounded-xl"
                />

                <div className="flex justify-between">
                    <button
                        type="submit"
                        className="bg-blue-600 text-white font-semibold px-4 py-2 rounded-xl hover:bg-blue-700"
                    >
                        Simpan
                    </button>
                    <button
                        type="button"
                        onClick={() => navigate("/laporan")}
                        className="px-4 py-2 bg-gray-300 rounded-xl text-gray-800 hover:bg-gray-400"
                    >
                        Batal
                    </button>
                </div>
            </form>
        </div>
    );
}
