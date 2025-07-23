import React, { useState, useEffect, useRef } from 'react';
import { Download, ArrowRight } from "lucide-react";
import { obatAPI } from '../services/obatAPI'; // Path sudah disesuaikan
import LoadingSpinner from '../components/LoadingSpinner'; // Asumsi path
import AlertBox from '../components/AlertBox'; // Asumsi path
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

// Konstanta untuk status, bisa disesuaikan
const SHORTAGE_THRESHOLD = 10;

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const reportRef = useRef();

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        // Mengambil semua data yang diperlukan secara paralel
        const [obatData, grupData, usersData] = await Promise.all([
          obatAPI.fetchObat(),
          obatAPI.fetchGrupObat(),
          obatAPI.fetchUsers(),
        ]);

        // Kalkulasi data dari API
        const shortagesCount = obatData.filter(obat => obat.quantity < SHORTAGE_THRESHOLD).length;
        const inventoryStatus = shortagesCount > 0 ? "Needs Attention" : "Good";
        
        setData({
          medicinesAvailable: obatData.length,
          medicineShortages: shortagesCount,
          medicineGroups: grupData.length,
          totalUsers: usersData.length,
          inventoryStatus: inventoryStatus,
        });

      } catch (err) {
        console.error("Failed to fetch dashboard data:", err);
        setError("Gagal memuat data dashboard. Silakan coba lagi.");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const handleDownloadPdf = () => {
    const input = reportRef.current;
    if (!input) return;

    // Sembunyikan tombol download dari hasil PDF
    const downloadButton = input.querySelector('#download-button');
    if (downloadButton) downloadButton.style.display = 'none';

    html2canvas(input, { scale: 2 }) // Meningkatkan skala untuk resolusi lebih baik
      .then((canvas) => {
        // Tampilkan kembali tombol setelah di-capture
        if (downloadButton) downloadButton.style.display = 'flex';

        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4'); // A4 size, portrait
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
        
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save(`dashboard-report-${new Date().toISOString().slice(0, 10)}.pdf`);
      });
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen"><LoadingSpinner /></div>;
  }

  if (error) {
    return <div className="p-6"><AlertBox message={error} type="error" /></div>;
  }

  // Helper untuk format angka menjadi 2 digit
  const formatTwoDigits = (num) => String(num).padStart(2, '0');

  // Struktur data untuk card atas (stats)
  const statsCards = [
    { title: "Inventory Status", value: data.inventoryStatus, color: data.inventoryStatus === 'Good' ? "green" : "red", action: "View Detailed Report" },
    { title: "Revenue", value: "N/A", subtitle: "Data not available", color: "yellow", action: "View Detailed Report" }, // Data statis
    { title: "Medicines Available", value: data.medicinesAvailable, color: "blue", action: "Visit Inventory" },
    { title: "Medicine Shortage", value: formatTwoDigits(data.medicineShortages), color: "red", action: "Resolve Now" },
  ];

  return (
    <div ref={reportRef} className="bg-gray-50 min-h-screen">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>
            <p className="text-gray-600">A quick data overview of the inventory.</p>
          </div>
          <button id="download-button" onClick={handleDownloadPdf} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2">
            <Download size={16} />
            Download Report
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statsCards.map((stat, index) => {
            const colors = {
              green: { bg: "bg-green-50 border-green-200", text: "text-green-800", button: "text-green-700" },
              yellow: { bg: "bg-yellow-50 border-yellow-200", text: "text-yellow-800", button: "text-orange-600" },
              blue: { bg: "bg-blue-50 border-blue-200", text: "text-blue-800", button: "text-blue-600" },
              red: { bg: "bg-red-50 border-red-200", text: "text-red-800", button: "text-red-600" },
            };
            const currentColors = colors[stat.color] || colors.blue;
            return (
              <div key={index} className={`p-6 rounded-lg border ${currentColors.bg}`}>
                <h3 className={`text-2xl font-bold ${currentColors.text}`}>{stat.value}</h3>
                <p className="text-gray-600 font-medium">{stat.title}</p>
                {stat.subtitle && <p className="text-sm text-gray-500">{stat.subtitle}</p>}
                <a href="/obat" className={`text-sm font-medium flex items-center gap-1 mt-4 transition-colors ${currentColors.button}`}>
                  {stat.action} <ArrowRight size={14} />
                </a>
              </div>
            );
          })}
        </div>

        {/* Sections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Inventory Section */}
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Inventory</h3>
                    <a href="/grup" className="text-sm font-medium text-blue-600 hover:text-blue-700 flex items-center gap-1">Go to Configuration <ArrowRight size={14}/></a>
                </div>
                <div className="space-y-2">
                    <p className="text-gray-700">{data.medicinesAvailable} Total no of Medicines</p>
                    <p className="text-gray-700">{data.medicineGroups} Medicine Groups</p>
                </div>
            </div>

            {/* Quick Report Section (Statis) */}
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Report</h3>
                <p className="text-sm text-gray-500 mb-4">Data not available</p>
                <div className="space-y-2 text-gray-400">
                    <p>0 Qty of Medicines Sold</p>
                    <p>0 Invoices Generated</p>
                </div>
            </div>

            {/* My Pharmacy Section */}
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">My Pharmacy</h3>
                    <a href="/user" className="text-sm font-medium text-blue-600 hover:text-blue-700 flex items-center gap-1">Go to User Management <ArrowRight size={14}/></a>
                </div>
                <div className="space-y-2">
                    <p className="text-gray-700">00 Total no of Suppliers (Data N/A)</p>
                    <p className="text-gray-700">{formatTwoDigits(data.totalUsers)} Total no of Users</p>
                </div>
            </div>

            {/* Customers Section (Statis) */}
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Customers</h3>
                    <a href="#" className="text-sm font-medium text-blue-600 hover:text-blue-700 flex items-center gap-1">Go to Customers Page <ArrowRight size={14}/></a>
                </div>
                <div className="space-y-2 text-gray-400">
                    <p>0 Total no of Customers (Data N/A)</p>
                    <p>Frequently bought item (Data N/A)</p>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;