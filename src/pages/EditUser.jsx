import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { obatAPI } from "../services/obatAPI";
import AlertBox from "../components/AlertBox";

export default function EditUser() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nama: "",
    email: "",
    posisi: "",
    nohp: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Ambil data user berdasarkan ID
  const loadUser = async () => {
    try {
      setLoading(true);
      const user = await obatAPI.fetchUserById(id);
      setForm(user);
    } catch (err) {
      setError("Gagal memuat data user.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUser();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError("");
      setLoading(true);
      await obatAPI.updateUser(id, form);
      setSuccess("User berhasil diperbarui!");
      setTimeout(() => navigate("/user"), 1000);
    } catch (err) {
      setError("Gagal memperbarui user.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Edit Data User</h2>

      {error && <AlertBox type="error">{error}</AlertBox>}
      {success && <AlertBox type="success">{success}</AlertBox>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="nama"
          value={form.nama}
          onChange={handleChange}
          placeholder="Nama Lengkap"
          required
          className="w-full p-3 border rounded-xl"
        />

        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          required
          className="w-full p-3 border rounded-xl"
        />

        <input
          type="text"
          name="posisi"
          value={form.posisi}
          onChange={handleChange}
          placeholder="Posisi / Jabatan"
          required
          className="w-full p-3 border rounded-xl"
        />

        <input
          type="number"
          name="nohp"
          value={form.nohp}
          onChange={handleChange}
          placeholder="Nomor HP"
          required
          className="w-full p-3 border rounded-xl"
        />

        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Password"
          required
          className="w-full p-3 border rounded-xl"
        />

        <div className="flex justify-between">
          <button
            type="submit"
            className="bg-blue-600 text-white font-semibold px-4 py-2 rounded-xl hover:bg-blue-700"
            disabled={loading}
          >
            {loading ? "Menyimpan..." : "Simpan Perubahan"}
          </button>
          <button
            type="button"
            onClick={() => navigate("/user")}
            className="px-4 py-2 bg-gray-300 rounded-xl text-gray-800 hover:bg-gray-400"
          >
            Batal
          </button>
        </div>
      </form>
    </div>
  );
}
