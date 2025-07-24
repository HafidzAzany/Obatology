import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { obatAPI } from "../services/obatAPI";
import AlertBox from "../components/AlertBox";

export default function TambahGrup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ nama_grup: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.nama_grup.trim()) {
      setError("Nama grup tidak boleh kosong.");
      return;
    }

    try {
      setLoading(true);
      await obatAPI.createGrup(form);
      setSuccess("Grup berhasil ditambahkan!");
      setTimeout(() => navigate("/grup"), 1000);
    } catch (err) {
      setError("Gagal menambahkan grup.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Tambah Grup Obat</h2>

      {error && <AlertBox type="error">{error}</AlertBox>}
      {success && <AlertBox type="success">{success}</AlertBox>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="nama_grup"
          value={form.nama_grup}
          onChange={handleChange}
          placeholder="Nama Grup Obat (contoh: Antibiotik)"
          required
          className="w-full p-3 border rounded-xl"
        />

        <div className="flex justify-between">
          <button
            type="submit"
            className="bg-blue-600 text-white font-semibold px-4 py-2 rounded-xl hover:bg-blue-700"
            disabled={loading}
          >
            {loading ? "Menyimpan..." : "Tambah Grup"}
          </button>
          <button
            type="button"
            onClick={() => navigate("/grup")}
            className="px-4 py-2 bg-gray-300 rounded-xl text-gray-800 hover:bg-gray-400"
          >
            Batal
          </button>
        </div>
      </form>
    </div>
  );
}
