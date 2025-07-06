import axios from 'axios'

const API_URL = "https://twqjxnsjgxdsmamkxmha.supabase.co/rest/v1/obat"
const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR3cWp4bnNqZ3hkc21hbWt4bWhhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTExMjgxNzEsImV4cCI6MjA2NjcwNDE3MX0.s6jxJ5hqzmTb45S3n7_XS7RlrC7GtpP5rz-TI5itun0"

const headers = {
    apikey: API_KEY,
    Authorization: `Bearer ${API_KEY}`,
    "Content-Type": "application/json",
}

export const obatAPI = {
    // Fetch semua obat
    async fetchObat() {
        const response = await axios.get(API_URL, { headers })
        return response.data
    },

    // Fetch 1 obat by ID
    async fetchObatById(id) {
        const response = await axios.get(`${API_URL}?id_obat=eq.${id}`, {
            headers
        })
        return response.data[0]
    },

    // Tambah obat
    async createObat(data) {
        const response = await axios.post(API_URL, data, { headers })
        return response.data
    },

    // Update obat
    async updateObat(id, data) {
        const response = await axios.patch(`${API_URL}?id_obat=eq.${id}`, data, {
            headers
        })
        return response.data
    },

    // Hapus obat
    async deleteObat(id) {
        const response = await axios.delete(`${API_URL}?id_obat=eq.${id}`, {
            headers
        })
        return response.data
    }
}

