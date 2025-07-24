import axios from 'axios'

const BASE_URL = "https://twqjxnsjgxdsmamkxmha.supabase.co/rest/v1";
const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR3cWp4bnNqZ3hkc21hbWt4bWhhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTExMjgxNzEsImV4cCI6MjA2NjcwNDE3MX0.s6jxJ5hqzmTb45S3n7_XS7RlrC7GtpP5rz-TI5itun0"

const headers = {
  apikey: API_KEY,
  Authorization: `Bearer ${API_KEY}`,
  "Content-Type": "application/json",
};

export const obatAPI = {
  // OBAT
  async fetchObat() {
    const response = await axios.get(
      `${BASE_URL}/obat?select=id_obat,nama_obat,quantity,grup_id,grup_obat(nama_grup)`,
      { headers }
    );
    return response.data;
  },

  async fetchObatById(id) {
    const response = await axios.get(`${BASE_URL}/obat?id_obat=eq.${id}`, {
      headers,
    });
    return response.data[0];
  },

  async createObat(data) {
    const response = await axios.post(`${BASE_URL}/obat`, data, { headers });
    return response.data;
  },

  async updateObat(id, data) {
    const response = await axios.patch(`${BASE_URL}/obat?id_obat=eq.${id}`, data, {
      headers,
    });
    return response.data;
  },

  async deleteObat(id) {
    const response = await axios.delete(`${BASE_URL}/obat?id_obat=eq.${id}`, {
      headers,
    });
    return response.data;
  },

  // GRUP OBAT
  async fetchGrupObat() {
    const response = await axios.get(`${BASE_URL}/grup_obat`, {
      headers,
    });
    return response.data;
  },

  async createGrup(data) {
    const response = await axios.post(`${BASE_URL}/grup_obat`, data, {
      headers,
    });
    return response.data;
  },

  // USERS
  async fetchUsers() {
    const response = await axios.get(`${BASE_URL}/users`, {
      headers,
    });
    return response.data;
  },

  async createUser(data) {
    const response = await axios.post(`${BASE_URL}/users`, data, {
      headers,
    });
    return response.data;
  },

  async deleteUser(id) {
    const response = await axios.delete(`${BASE_URL}/users?id=eq.${id}`, {
      headers,
    });
    return response.data;
  },

  async fetchUserById(id) {
    const response = await axios.get(`${BASE_URL}/users?id=eq.${id}`, {
      headers,
    });
    return response.data[0];
  },

  async updateUser(id, data) {
    const response = await axios.patch(`${BASE_URL}/users?id=eq.${id}`, data, {
      headers,
    });
    return response.data;
  },

  // LAPORAN OBAT
  async fetchLaporan() {
    const response = await axios.get(
      `${BASE_URL}/laporan_obat?select=id_laporan,tanggal,jumlah_dipakai,keterangan,obat:obat_id(nama_obat)`,
      { headers }
    );
    return response.data;
  },

  async tambahLaporan(data) {
    const response = await axios.post(`${BASE_URL}/laporan_obat`, data, { headers });
    return response.data;
  },

  async kurangiStokObat(id, jumlah_dipakai) {
    // Ambil quantity sekarang
    const res = await axios.get(`${BASE_URL}/obat?id_obat=eq.${id}`, { headers });
    const obat = res.data[0];
    const stokBaru = obat.quantity - jumlah_dipakai;
  
    // Update stoknya
    const response = await axios.patch(`${BASE_URL}/obat?id_obat=eq.${id}`, {
      quantity: stokBaru
    }, { headers });
  
    return response.data;
  },

  //Detail Product
  async fetchObatById(id) {
    const response = await axios.get(`${BASE_URL}/obat?id_obat=eq.${id}&select=*,grup_obat(nama_grup)`, {
      headers,
    });
    return response.data[0];
  }
  
  

};
