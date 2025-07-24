import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { obatAPI } from "../services/obatAPI";
import { AiOutlineWarning } from "react-icons/ai";

export default function ProductDetail() {
  const { id } = useParams();
  const [obat, setObat] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchObat = async () => {
      try {
        const data = await obatAPI.fetchObatById(id);
        if (!data) {
          setError("Obat tidak ditemukan.");
        } else {
          setObat(data);
        }
      } catch (err) {
        console.error("Gagal mengambil detail obat:", err);
        setError("Gagal memuat detail obat.");
      }
    };

    fetchObat();
  }, [id]);

  if (error) {
    return (
      <div className="bg-red-100 text-red-700 p-4 rounded-lg mt-4 max-w-xl mx-auto flex items-center">
        <AiOutlineWarning className="mr-2 text-xl" />
        {error}
      </div>
    );
  }

  if (!obat) {
    return <div className="p-4 text-center text-gray-500">Memuat data obat...</div>;
  }

  return (
    <div className="p-6 bg-white rounded-xl shadow-lg max-w-xl mx-auto mt-6">
      <h2 className="text-2xl font-bold mb-3 text-emerald-700">{obat.nama_obat}</h2>

      <p className="text-gray-700 mb-2">
        <span className="font-medium text-gray-800">Stok tersedia:</span>{" "}
        <span className="text-green-600 font-semibold">{obat.quantity}</span>
      </p>

      <p className="text-gray-700 mb-2">
        <span className="font-medium text-gray-800">Grup Obat:</span>{" "}
        {obat.grup_obat?.nama_grup || <em className="text-gray-500">Tidak diketahui</em>}
      </p>

      <p className="text-sm text-gray-500 mt-4 italic">
        ID Obat: <code>{obat.id_obat}</code>
      </p>
    </div>
  );
}
