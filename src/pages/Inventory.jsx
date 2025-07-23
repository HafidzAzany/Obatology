import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { obatAPI } from '../services/obatAPI'; // Path sudah diperbaiki
import LoadingSpinner from '../components/LoadingSpinner'; // Asumsi path, sesuaikan jika perlu
import AlertBox from '../components/AlertBox'; // Asumsi path, sesuaikan jika perlu
import { FaHeart, FaPlus } from 'react-icons/fa';

// Anda bisa meletakkan ini di file konfigurasi terpisah
const SHORTAGE_THRESHOLD = 10; // Obat dianggap langka jika stok < 10

const Inventory = () => {
  const [stats, setStats] = useState({
    medicines: 0,
    groups: 0,
    shortages: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInventoryData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Mengambil data obat dan grup secara bersamaan untuk efisiensi
        const [obatData, grupData] = await Promise.all([
          obatAPI.fetchObat(),
          obatAPI.fetchGrupObat(),
        ]);

        // Kalkulasi data shortage
        const shortagesCount = obatData.filter(
          (obat) => obat.quantity < SHORTAGE_THRESHOLD
        ).length;

        // Memperbarui state dengan data dari API
        setStats({
          medicines: obatData.length,
          groups: grupData.length,
          shortages: shortagesCount,
        });

      } catch (err) {
        console.error("Error fetching inventory data:", err);
        setError("Gagal memuat data inventaris. Silakan coba lagi nanti.");
      } finally {
        setLoading(false);
      }
    };

    fetchInventoryData();
  }, []); // Dependency array kosong agar useEffect hanya berjalan sekali saat komponen dimuat

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <AlertBox message={error} type="error" />;
  }

  // Helper untuk format angka menjadi 2 digit (misal: 2 -> 02)
  const formatTwoDigits = (num) => String(num).padStart(2, '0');

  return (
    <div className="inventory-container p-8">
      <h1 className="text-3xl font-bold mb-2">Inventory</h1>
      <p className="text-gray-600 mb-8">List of medicines available for sales.</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card: Medicines Available */}
        <div className="stat-card bg-white p-6 rounded-lg shadow-md flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start">
              <h2 className="text-lg font-semibold text-gray-700">Medicines Available</h2>
              <FaPlus className="text-gray-400" />
            </div>
            <p className="text-5xl font-bold my-4">{stats.medicines}</p>
          </div>
          <div className="flex justify-between items-center">
            <Link to="/obat" className="text-blue-600 hover:underline">View Full List</Link>
            <FaHeart className="text-red-300 hover:text-red-500 cursor-pointer" />
          </div>
        </div>

        {/* Card: Medicine Groups */}
        <div className="stat-card bg-white p-6 rounded-lg shadow-md flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start">
              <h2 className="text-lg font-semibold text-gray-700">Medicine Groups</h2>
              <FaPlus className="text-gray-400" />
            </div>
            <p className="text-5xl font-bold my-4">{formatTwoDigits(stats.groups)}</p>
          </div>
          <div className="flex justify-between items-center">
            <Link to="/grup" className="text-blue-600 hover:underline">View Groups</Link>
            <FaHeart className="text-red-300 hover:text-red-500 cursor-pointer" />
          </div>
        </div>

        {/* Card: Medicine Shortage */}
        <div className="stat-card bg-white p-6 rounded-lg shadow-md flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start">
              <h2 className="text-lg font-semibold text-gray-700">Medicine Shortage</h2>
              <FaPlus className="text-gray-400" />
            </div>
            <p className="text-5xl font-bold my-4 text-red-500">{formatTwoDigits(stats.shortages)}</p>
          </div>
          <div className="flex justify-between items-center">
            <Link to="/obat" className="text-blue-600 hover:underline">Resolve Now</Link>
            <FaHeart className="text-red-500 cursor-pointer" />
          </div>
        </div>
      </div>

      {/* Tombol Add New Item */}
      <div className="mt-8">
         <Link 
            to="/tambah-obat" 
            className="add-new-item bg-white p-4 rounded-lg shadow-md flex items-center justify-center text-gray-700 hover:bg-gray-50 transition"
        >
            Add New Item
        </Link>
      </div>
    </div>
  );
};

export default Inventory;