// src/components/FormTambahObat.jsx
import { useState, useEffect } from "react"
import AlertBox from "./AlertBox"

export default function FormTambahObat({ onSubmit, editingObat, loading, successMessage, errorMessage, onCancelEdit }) {
    const [form, setForm] = useState({
        nama_obat: "",
        quantity: ""
    })

    useEffect(() => {
        if (editingObat) {
            setForm({
                nama_obat: editingObat.nama_obat,
                quantity: editingObat.quantity
            })
        } else {
            setForm({ nama_obat: "", quantity: "" })
        }
    }, [editingObat])

    const handleChange = (e) => {
        const { name, value } = e.target
        setForm({ ...form, [name]: value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        onSubmit(form)
    }

    return (
        <div className="bg-white p-6 rounded-2xl shadow-lg mb-10">
            <h3 className="text-lg font-semibold mb-4">
                {editingObat ? "Edit Obat" : "Tambah Obat Baru"}
            </h3>

            {errorMessage && <AlertBox type="error">{errorMessage}</AlertBox>}
            {successMessage && <AlertBox type="success">{successMessage}</AlertBox>}

            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    name="nama_obat"
                    value={form.nama_obat}
                    onChange={handleChange}
                    placeholder="Nama Obat"
                    required
                    className="w-full p-3 border rounded-2xl bg-gray-50"
                />

                <input
                    type="number"
                    name="quantity"
                    value={form.quantity}
                    onChange={handleChange}
                    placeholder="Jumlah"
                    required
                    className="w-full p-3 border rounded-2xl bg-gray-50"
                />

                <div>
                    <button
                        type="submit"
                        className="px-6 py-3 bg-emerald-600 text-white font-semibold rounded-2xl hover:bg-emerald-700"
                        disabled={loading}
                    >
                        {loading ? "Mohon tunggu..." : editingObat ? "Simpan Perubahan" : "Tambah Obat"}
                    </button>

                    {editingObat && (
                        <button
                            type="button"
                            onClick={onCancelEdit}
                            className="ml-3 px-6 py-3 bg-gray-300 text-gray-800 font-semibold rounded-2xl"
                        >
                            Batal Edit
                        </button>
                    )}
                </div>
            </form>
        </div>
    )
}
