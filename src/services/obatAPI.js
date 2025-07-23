import axios from 'axios'

const API_URL = "https://twqjxnsjgxdsmamkxmha.supabase.co/rest/v1"
const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR3cWp4bnNqZ3hkc21hbWt4bWhhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTExMjgxNzEsImV4cCI6MjA2NjcwNDE3MX0.s6jxJ5hqzmTb45S3n7_XS7RlrC7GtpP5rz-TI5itun0"

const headers = {
    apikey: API_KEY,
    Authorization: `Bearer ${API_KEY}`,
    "Content-Type": "application/json",
}

export const obatAPI = {
    // Fetch semua obat dengan nama grup (relasi)
    async fetchObat() {
        const response = await axios.get(`${API_URL}/obat?select=id_obat,nama_obat,quantity,grup_id,grup_obat(nama_grup)`, {
            headers
        })
        return response.data
    },

    // Fetch 1 obat berdasarkan ID
    async fetchObatById(id) {
        const response = await axios.get(`${API_URL}/obat?id_obat=eq.${id}`, {
            headers
        })
        return response.data[0]
    },

    // Tambah obat (tanpa field 'jenis')
    async createObat(data) {
        const response = await axios.post(`${API_URL}/obat`, data, {
            headers
        })
        return response.data
    },

    // Update obat (tanpa field 'jenis')
    async updateObat(id, data) {
        const response = await axios.patch(`${API_URL}/obat?id_obat=eq.${id}`, data, {
            headers
        })
        return response.data
    },

    // Hapus obat
    async deleteObat(id) {
        const response = await axios.delete(`${API_URL}/obat?id_obat=eq.${id}`, {
            headers
        })
        return response.data
    },

    // Ambil semua data grup_obat
    async fetchGrupObat() {
        const response = await axios.get(`${API_URL}/grup_obat`, {
            headers
        })
        return response.data
    },

    // Tambah grup obat ke Supabase
    async createGrup(data) {
        const response = await axios.post(`${API_URL}/grup_obat`, data, { headers });
        return response.data;
    }
  
}
