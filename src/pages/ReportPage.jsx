import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { obatAPI } from "../services/obatAPI";
import PageHeader from "../components/PageHeader";
import GenericTable from "../components/GenericTable";
import LoadingSpinner from "../components/LoadingSpinner";
import EmptyState from "../components/EmptyState";

export default function ReportPage() {
  const [medicineTransactions, setMedicineTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    setError(null);

    obatAPI.fetchLaporan()
      .then((data) => {
        setMedicineTransactions(data);
      })
      .catch((err) => {
        console.error("Gagal mengambil laporan:", err);
        setError("Gagal memuat data laporan.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const generateAndDownloadCSV = (data, filename = 'laporan_obat_harian.csv') => {
    if (!data || data.length === 0) {
      alert("Tidak ada data laporan untuk diunduh!");
      return;
    }

    const headers = [
      "ID Laporan",
      "Tanggal",
      "Nama Obat",
      "Jumlah Dipakai",
      "Keterangan"
    ];

    const csvRows = [headers.join(',')];

    data.forEach(item => {
      const values = [
        `"${item.id_laporan}"`,
        `"${item.tanggal}"`,
        `"${item.obat?.nama_obat || "-"}"`,
        item.jumlah_dipakai,
        `"${item.keterangan || ""}"`
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
    URL.revokeObjectURL(link.href);
  };

  const handleDownloadMedicineReport = () => {
    generateAndDownloadCSV(medicineTransactions);
  };

  const tableHeaders = [
    { key: 'id_laporan', label: 'ID Laporan' },
    { key: 'tanggal', label: 'Tanggal' },
    { key: 'nama_obat', label: 'Nama Obat' },
    { key: 'jumlah_dipakai', label: 'Jumlah' },
    { key: 'keterangan', label: 'Keterangan' }
  ];

  return (
    <div className="flex flex-col flex-grow p-6">
      <PageHeader title="Laporan Penggunaan Obat Harian" />

      <div className="bg-white rounded-lg shadow-md p-6 mt-6 flex-grow">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Laporan Pemakaian Obat</h2>
          <div className="flex space-x-2">
            <button
              onClick={() => navigate("/tambah-laporan")}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-4 py-2 rounded-lg"
            >
              Tambah Laporan Hari Ini
            </button>
            <button
              onClick={handleDownloadMedicineReport}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg"
              disabled={isLoading || medicineTransactions.length === 0 || error}
            >
              Unduh CSV
            </button>
          </div>
        </div>

        {isLoading && <LoadingSpinner text="Memuat laporan..." />}
        {!isLoading && error && <EmptyState text={error} />}
        {!isLoading && medicineTransactions.length === 0 && !error && <EmptyState text="Belum ada laporan." />}

        {!isLoading && medicineTransactions.length > 0 && (
          <div className="overflow-x-auto mt-4">
            <GenericTable
              headers={tableHeaders}
              data={medicineTransactions.map(item => ({
                id_laporan: item.id_laporan,
                tanggal: item.tanggal,
                nama_obat: item.obat?.nama_obat || "-",
                jumlah_dipakai: item.jumlah_dipakai,
                keterangan: item.keterangan || "-"
              }))}
            />
          </div>
        )}
      </div>
    </div>
  );
}
