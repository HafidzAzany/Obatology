import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { obatAPI } from "../services/obatAPI";
import AlertBox from "../components/AlertBox";

export default function TambahObat() {
    const navigate = useNavigate();
    const [form, setForm] = useState({ nama_obat: "", quantity: "", jenis: "", grup_id: "" });
    const [grupList, setGrupList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
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
            setError("");
            await obatAPI.createObat(form);
            setSuccess("Obat berhasil ditambahkan!");
            setTimeout(() => navigate("/medicine"), 1000);
        } catch (err) {
            setError("Gagal menambahkan obat.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto p-6">
            <h2 className="text-2xl font-bold mb-4">Tambah Obat Baru</h2>

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
                    type="text"
                    name="jenis"
                    value={form.jenis}
                    onChange={handleChange}
                    placeholder="Jenis Obat"
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
                        className="bg-emerald-600 text-white font-semibold px-4 py-2 rounded-xl hover:bg-emerald-700"
                        disabled={loading}
                    >
                        {loading ? "Menyimpan..." : "Tambah Obat"}
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
