import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { obatAPI } from "../services/obatAPI";
import AlertBox from "../components/AlertBox";

export default function TambahLaporan() {
  const [tanggal, setTanggal] = useState(new Date().toISOString().split("T")[0]);
  const [obatList, setObatList] = useState([]);
  const [selectedObat, setSelectedObat] = useState("");
  const [jumlah, setJumlah] = useState("");
  const [keterangan, setKeterangan] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    obatAPI.fetchObat().then(setObatList).catch(() => setError("Gagal ambil data obat"));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedObat || !jumlah) {
      setError("Semua field wajib diisi.");
      return;
    }

    try {
      setError("");
      await obatAPI.tambahLaporan({
        tanggal,
        obat_id: parseInt(selectedObat),
        jumlah_dipakai: parseInt(jumlah),
        keterangan
      });

      // Ambil data obat sekarang
      const obat = obatList.find(o => o.id_obat == selectedObat);
      const stokBaru = obat.quantity - jumlah;

      // Update stok
      await obatAPI.kurangiStokObat(selectedObat, stokBaru);

      setSuccess("Laporan berhasil ditambahkan dan stok diperbarui!");
      setTimeout(() => navigate("/laporan"), 1000);
    } catch (err) {
      console.error(err);
      setError("Gagal menyimpan laporan.");
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Tambah Laporan Hari Ini</h2>
      {error && <AlertBox type="error">{error}</AlertBox>}
      {success && <AlertBox type="success">{success}</AlertBox>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="date" value={tanggal} onChange={(e) => setTanggal(e.target.value)} className="w-full p-3 border rounded-xl" required />

        <select value={selectedObat} onChange={(e) => setSelectedObat(e.target.value)} className="w-full p-3 border rounded-xl" required>
          <option value="">Pilih Obat</option>
          {obatList.map(obat => (
            <option key={obat.id_obat} value={obat.id_obat}>{obat.nama_obat} (stok: {obat.quantity})</option>
          ))}
        </select>

        <input type="number" placeholder="Jumlah Dipakai" value={jumlah} onChange={(e) => setJumlah(e.target.value)} className="w-full p-3 border rounded-xl" required />
        <textarea placeholder="Keterangan (opsional)" value={keterangan} onChange={(e) => setKeterangan(e.target.value)} className="w-full p-3 border rounded-xl" />

        <div className="flex justify-between">
          <button type="submit" className="bg-blue-600 text-white font-semibold px-4 py-2 rounded-xl hover:bg-blue-700">Simpan</button>
          <button type="button" onClick={() => navigate("/laporan")} className="px-4 py-2 bg-gray-300 rounded-xl text-gray-800 hover:bg-gray-400">Batal</button>
        </div>
      </form>
    </div>
  );
}
