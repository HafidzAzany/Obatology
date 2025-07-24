import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { obatAPI } from "../services/obatAPI";
import { AiOutlineWarning } from "react-icons/ai";

// Objek gambar produk unggulan (sesuaikan nama_obat di DB)
const productImages = {
  Paracetamol:
    "https://th.bing.com/th/id/OIP.Th-tOf3ZHXk0xKTINnvtwAHaHa?w=158&h=180&c=7&r=0&o=7&dpr=1.4&pid=1.7&rm=3",
  Amoxicillin:
    "https://th.bing.com/th/id/OIP._OQxU__KSN6QwXMPWhq2wAHaHa?w=196&h=196&c=7&r=0&o=7&dpr=1.4&pid=1.7&rm=3",
  Ibuprofen:
    "https://th.bing.com/th/id/OIP.BtO5brgMH1WU6F5K5NK3VQHaHa?w=188&h=188&c=7&r=0&o=7&dpr=1.4&pid=1.7&rm=3",
  Cetirizine: "https://bernofarm.com/wp-content/uploads/2022/03/lengkap-2.png",
  Tramadol:
    "https://s3-publishing-cmn-svc-prd.s3.ap-southeast-1.amazonaws.com/article/fO-HbyvUDqoRoQnPcxwyZ/original/1667723141-Tramadol.jpg",
  Ranitidine:
    "https://d1vbn70lmn1nqe.cloudfront.net/prod/wp-content/uploads/2024/09/24024349/Ranitidin.jpg.webp",
  Panadol:
    "https://d2qjkwm11akmwu.cloudfront.net/products/695343_19-11-2024_13-42-19.png",
};

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
    return (
      <div className="p-4 text-center text-gray-500">Memuat data obat...</div>
    );
  }

  // Cari gambar sesuai nama_obat, jika tidak ada tampilkan default
  const imageUrl =
    productImages[obat.nama_obat] || "https://d2qjkwm11akmwu.cloudfront.net/products/695343_19-11-2024_13-42-19.png";

  return (
    <div className="p-6 bg-white rounded-xl shadow-lg max-w-xl mx-auto mt-6">
      <img
        src={imageUrl}
        alt={obat.nama_obat}
        className="w-full h-64 object-contain mb-4 rounded-lg"
      />

      <h2 className="text-2xl font-bold mb-3 text-emerald-700">
        {obat.nama_obat}
      </h2>

      <p className="text-gray-700 mb-2">
        <span className="font-medium text-gray-800">Stok tersedia:</span>{" "}
        <span className="text-green-600 font-semibold">{obat.quantity}</span>
      </p>

      <p className="text-gray-700 mb-2">
        <span className="font-medium text-gray-800">Grup Obat:</span>{" "}
        {obat.grup_obat?.nama_grup || (
          <em className="text-gray-500">Tidak diketahui</em>
        )}
      </p>

      <p className="text-sm text-gray-500 mt-4 italic">
        ID Obat: <code>{obat.id_obat}</code>
      </p>
    </div>
  );
}
