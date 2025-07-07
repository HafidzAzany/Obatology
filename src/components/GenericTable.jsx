import React from 'react';

// Mengubah props dari { columns, data, renderRow } menjadi { headers, data }
// 'headers' diharapkan berupa array of objects: [{ key: 'id', label: 'ID' }, ...]
// 'data' diharapkan berupa array of objects: [{ id: 1, name: '...', ... }, ...]
export default function GenericTable({ headers, data }) {
    // Tambahkan console.log untuk melihat props yang diterima
    console.log("GenericTable: Received headers:", headers);
    console.log("GenericTable: Received data:", data);

    // Pastikan headers adalah array. Jika tidak, tampilkan error.
    if (!Array.isArray(headers)) {
        console.error("GenericTable: 'headers' prop must be an array.", headers);
        return <p className="text-red-500">Error: Header tabel tidak valid.</p>;
    }

    // Pastikan data adalah array. Jika tidak, tampilkan error.
    // Ini akan mencegah 'Cannot read properties of undefined (reading 'map')'
    if (!Array.isArray(data)) {
        console.error("GenericTable: 'data' prop must be an array.", data);
        // Tampilkan pesan yang lebih informatif di UI jika data tidak valid
        return <p className="text-red-500">Error: Data yang diberikan ke tabel tidak valid.</p>;
    }

    return (
        <table className="min-w-full divide-y divide-gray-200 overflow-hidden rounded-2xl shadow-lg">
            <thead className="text-white bg-blue-600"> {/* Menggunakan bg-blue-600 agar konsisten dengan ListUser */}
                <tr>
                    {/* Render header tabel dari array 'headers' */}
                    {headers.map((header, idx) => (
                        <th key={header.key || idx} className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                            {header.label}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100 text-sm text-gray-800">
                {data.length === 0 ? (
                    <tr>
                        <td colSpan={headers.length} className="px-6 py-4 whitespace-nowrap text-center text-gray-500">
                            Tidak ada data yang tersedia.
                        </td>
                    </tr>
                ) : (
                    // Render baris data
                    data.map((item, rowIndex) => (
                        <tr key={item.id || rowIndex} className="hover:bg-gray-50"> {/* Gunakan item.id jika ada, fallback ke rowIndex */}
                            {/* Render sel untuk setiap kolom berdasarkan 'key' di header */}
                            {headers.map((header, colIndex) => (
                                <td key={header.key || colIndex} className="px-6 py-4 whitespace-nowrap">
                                    {/* Akses nilai item menggunakan header.key */}
                                    {/* Tambahkan fallback jika item[header.key] adalah undefined/null */}
                                    {item[header.key] || '-'}
                                </td>
                            ))}
                        </tr>
                    ))
                )}
            </tbody>
        </table>
    );
}