import React, { useState, useEffect } from 'react';
import transactionsData from '../data/transactions.json'; 
import PageHeader from '../components/PageHeader'; 
import GenericTable from '../components/GenericTable'; 

export default function ReportPage() {
    const [medicineTransactions, setMedicineTransactions] = useState([]);
    const [isLoading, setIsLoading] = useState(true); // Untuk indikator loading
    const [error, setError] = useState(null); // Untuk menangani error loading data

    useEffect(() => {
        console.log("ReportPage: Component mounted. Fetching data...");
        setIsLoading(true);
        setError(null); // Reset error state

        try {
            // Memastikan transactionsData adalah array sebelum memproses
            if (Array.isArray(transactionsData)) {
                console.log("ReportPage: transactionsData loaded successfully.", transactionsData);
                setMedicineTransactions(transactionsData);
            } else {
                const errorMessage = "Error: transactions.json is not an array or could not be loaded. Please ensure the file exists and contains a valid JSON array.";
                console.error("ReportPage:", errorMessage, transactionsData);
                setError(errorMessage);
                setMedicineTransactions([]); // Pastikan state tetap array kosong jika ada masalah
            }
        } catch (e) {
            const errorMessage = "Error loading transactionsData: " + e.message;
            console.error("ReportPage:", errorMessage, e);
            setError(errorMessage);
            setMedicineTransactions([]);
        } finally {
            setIsLoading(false);
            console.log("ReportPage: Data loading finished.");
        }
    }, []); // [] agar efek hanya berjalan sekali saat komponen dimount

    // Fungsi untuk menghasilkan dan mengunduh file CSV
    const generateAndDownloadCSV = (data, filename = 'laporan_obat_masuk_keluar.csv') => {
        if (!data || data.length === 0) {
            alert("Tidak ada data transaksi obat untuk diunduh!");
            return;
        }

        // Definisikan header CSV secara manual untuk memastikan urutan dan nama yang jelas
        const headers = [
            'ID Transaksi',
            'Tanggal',
            'Nama Obat',
            'Jenis Transaksi', // Masuk / Keluar
            'Jumlah',
            'Unit',
            'Pihak Terkait', // Supplier atau Customer
            'Keterangan'
        ];

        // Buat baris header CSV
        const csvRows = [headers.join(',')];

        // Tambahkan baris data
        data.forEach(item => {
            // Tentukan pihak terkait (supplier atau customer)
            const pihakTerkait = item.jenis === 'Masuk' ? (item.supplier || '') : (item.customer || '');

            const values = [
                `"${(item.id || '').replace(/"/g, '""')}"`,
                `"${(item.tanggal || '').replace(/"/g, '""')}"`,
                `"${(item.namaObat || '').replace(/"/g, '""')}"`,
                `"${(item.jenis || '').replace(/"/g, '""')}"`,
                item.jumlah || 0, // Pastikan jumlah adalah angka
                `"${(item.unit || '').replace(/"/g, '""')}"`,
                `"${(pihakTerkait).replace(/"/g, '""')}"`,
                `"${(item.keterangan || '').replace(/"/g, '""')}"`
            ];
            csvRows.push(values.join(','));
        });

        const csvString = csvRows.join('\n');
        const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.setAttribute('download', filename);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(link.href); // Bersihkan URL objek setelah digunakan
    };

    const handleDownloadMedicineReport = () => {
        generateAndDownloadCSV(medicineTransactions, 'laporan_obat_masuk_keluar.csv');
    };

    // Definisikan kolom untuk tabel pratinjau (GenericTable)
    const tableHeaders = [
        { key: 'id', label: 'ID Transaksi' },
        { key: 'tanggal', label: 'Tanggal' },
        { key: 'namaObat', label: 'Nama Obat' },
        { key: 'jenis', label: 'Jenis' },
        { key: 'jumlah', label: 'Jumlah' },
        { key: 'unit', label: 'Unit' },
        { key: 'pihakTerkait', label: 'Pihak Terkait' }, // Akan diisi di map data
        { key: 'keterangan', label: 'Keterangan' }
    ];

    return (
        <div className="flex flex-col flex-grow p-6">
            {/* PageHeader akan menampilkan judul halaman */}
            <PageHeader title="Laman Laporan Obat Masuk & Keluar" />

            <div className="bg-white rounded-lg shadow-md p-6 mt-6 flex-grow">
                <h2 className="text-xl font-semibold mb-4">Laporan Data Obat Masuk dan Keluar</h2>
                <p className="text-gray-700 mb-6">
                    Halaman ini menampilkan riwayat transaksi obat masuk dan keluar, yang dapat Anda unduh dalam format CSV.
                </p>

                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                        <strong className="font-bold">Error:</strong>
                        <span className="block sm:inline"> {error}</span>
                    </div>
                )}

                <div className="mb-8">
                    <button
                        onClick={handleDownloadMedicineReport}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300"
                        disabled={isLoading || medicineTransactions.length === 0 || error} // Disable jika ada error
                    >
                        {isLoading ? 'Memuat Data...' : 'Unduh Laporan Obat (CSV)'}
                    </button>
                    {medicineTransactions.length === 0 && !isLoading && !error && (
                        <p className="text-red-500 mt-2">Tidak ada data transaksi obat untuk diunduh.</p>
                    )}
                </div>

                {/* Bagian Pratinjau Data Laporan */}
                <h3 className="text-lg font-semibold mb-3">Pratinjau Data</h3>
                {isLoading ? (
                    <p>Memuat pratinjau data...</p>
                ) : error ? (
                    <p className="text-red-600">Gagal memuat pratinjau data karena error.</p>
                ) : medicineTransactions.length > 0 ? (
                    <div className="overflow-x-auto">
                        <GenericTable
                            headers={tableHeaders}
                            data={medicineTransactions.map(item => ({
                                id: item.id,
                                tanggal: item.tanggal,
                                namaObat: item.namaObat,
                                jenis: item.jenis,
                                jumlah: item.jumlah,
                                unit: item.unit,
                                // Menentukan pihak terkait untuk tampilan tabel
                                pihakTerkait: item.jenis === 'Masuk' ? item.supplier : item.customer,
                                keterangan: item.keterangan
                            }))}
                        />
                    </div>
                ) : (
                    <p className="text-gray-600">Tidak ada data untuk ditampilkan dalam pratinjau.</p>
                )}
            </div>
        </div>
    );
}
