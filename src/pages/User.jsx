// src/pages/User.jsx

import { useEffect, useState } from "react";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { obatAPI } from "../services/obatAPI";
import GenericTable from "../components/GenericTable";
import LoadingSpinner from "../components/LoadingSpinner";
import EmptyState from "../components/EmptyState";

export default function UserList() {
  const [userList, setUserList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const loadUsers = async () => {
    try {
      setLoading(true);
      const data = await obatAPI.fetchUsers();
      setUserList(data);
    } catch (err) {
      setError("Gagal memuat data user.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Yakin ingin menghapus user ini?")) return;
    try {
      setLoading(true);
      await obatAPI.deleteUser(id);
      await loadUsers();
    } catch (err) {
      setError("Gagal menghapus user.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">Manajemen Pengguna 👤</h2>
        <button
          onClick={() => navigate("/tambah-user")}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-xl shadow-md transition duration-200 ease-in-out"
        >
          Tambah User
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-700">Daftar Pengguna</h3>
        </div>

        {loading && <LoadingSpinner text="Memuat data user..." />}
        {!loading && error && <EmptyState text={error} />}
        {!loading && userList.length === 0 && !error && <EmptyState text="Belum ada data user." />}

        {!loading && userList.length > 0 && (
          <GenericTable
            columns={["#", "Nama", "Email", "Posisi", "No HP", "Password", "Aksi"]}
            data={userList}
            renderRow={(user, index) => (
              <>
                <td className="px-6 py-3 text-sm">{index + 1}.</td>
                <td className="px-6 py-3 text-sm">{user.nama}</td>
                <td className="px-6 py-3 text-sm">{user.email}</td>
                <td className="px-6 py-3 text-sm">{user.posisi}</td>
                <td className="px-6 py-3 text-sm">{user.nohp}</td>
                <td className="px-6 py-3 text-sm">••••••••</td>
                <td className="px-6 py-3 whitespace-nowrap text-sm font-medium">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => navigate(`/edit-user/${user.id}`)}
                      className="p-1 rounded-full hover:bg-gray-100"
                      title="Edit User"
                    >
                      <AiFillEdit className="text-blue-500 text-xl hover:text-blue-700" />
                    </button>
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="p-1 rounded-full hover:bg-gray-100"
                      title="Hapus User"
                    >
                      <AiFillDelete className="text-red-500 text-xl hover:text-red-700" />
                    </button>
                  </div>
                </td>
              </>
            )}
          />
        )}
      </div>
    </div>
  );
}
