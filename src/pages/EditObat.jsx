import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { obatAPI } from "../services/obatAPI";
import AlertBox from "../components/AlertBox";

export default function EditObat() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [form, setForm] = useState({ nama_obat: "", quantity: "", jenis: "", grup_id: "" });
    const [grupList, setGrupList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");

    const fetchObat = async () => {
        try {
            setLoading(true);
            const data = await obatAPI.fetchObatById(id);
            setForm({
                nama_obat: data.nama_obat || "",
                quantity: data.quantity || "",
                jenis: data.jenis || "",
                grup_id: data.grup_id || ""
            });
        } catch (err) {
            setError("Gagal memuat data obat.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchObat();
        const loadGrup = async () => {
            const data = await obatAPI.fetchGrupObat();
            setGrupList(data);
        };
        loadGrup();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            await obatAPI.updateObat(id, form);
            setSuccess("Obat berhasil diperbarui!");
            setTimeout(() => navigate("/medicine"), 1000);
        } catch (err) {
            setError("Gagal memperbarui obat.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto p-6">
            <h2 className="text-2xl font-bold mb-4">Edit Obat</h2>

            {error && <AlertBox type="error">{error}</AlertBox>}
            {success && <AlertBox type="success">{success}</AlertBox>}

            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    name="nama_obat"
                    value={form.nama_obat}
                    onChange={handleChange}
                    placeholder="Nama Obat"
                    required
                    className="w-full p-3 border rounded-xl"
                />

                <input
                    type="number"
                    name="quantity"
                    value={form.quantity}
                    onChange={handleChange}
                    placeholder="Jumlah"
                    required
                    className="w-full p-3 border rounded-xl"
                />

                <input
                    type="text"
                    name="jenis"
                    value={form.jenis}
                    onChange={handleChange}
                    placeholder="Jenis"
                    required
                    className="w-full p-3 border rounded-xl"
                />

                <select
                    name="grup_id"
                    value={form.grup_id}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border rounded-xl"
                >
                    <option value="">Pilih Grup Obat</option>
                    {grupList.map((grup) => (
                        <option key={grup.id} value={grup.id}>{grup.nama_grup}</option>
                    ))}
                </select>

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
                        onClick={() => navigate("/medicine")}
                        className="px-4 py-2 bg-gray-300 rounded-xl text-gray-800 hover:bg-gray-400"
                    >
                        Batal
                    </button>
                </div>
            </form>
        </div>
    );
}
