import { useEffect, useState } from "react";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { obatAPI } from "../services/obatAPI";
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
    <div className="w-full p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Manajemen Pengguna 👤</h2>
        <button
          onClick={() => navigate("/tambah-user")}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg md:rounded-xl text-sm md:text-base shadow-md transition duration-200"
        >
          Tambah User
        </button>
      </div>

      <div className="bg-white rounded-lg md:rounded-xl shadow-md border border-gray-200 overflow-x-auto">
        <div className="px-4 md:px-6 py-3 border-b border-gray-200">
          <h3 className="text-base md:text-lg font-semibold text-gray-700">Daftar Pengguna</h3>
        </div>

        {loading && <LoadingSpinner text="Memuat data user..." />}
        {!loading && error && <EmptyState text={error} />}
        {!loading && userList.length === 0 && !error && <EmptyState text="Belum ada data user." />}

        {!loading && userList.length > 0 && (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-blue-600">
                <tr>
                  <th scope="col" className="px-4 md:px-6 py-3 text-left text-xs md:text-sm font-medium text-white uppercase tracking-wider">#</th>
                  <th scope="col" className="px-4 md:px-6 py-3 text-left text-xs md:text-sm font-medium text-white uppercase tracking-wider">Nama</th>
                  <th scope="col" className="px-4 md:px-6 py-3 text-left text-xs md:text-sm font-medium text-white uppercase tracking-wider">Email</th>
                  <th scope="col" className="px-4 md:px-6 py-3 text-left text-xs md:text-sm font-medium text-white uppercase tracking-wider">Posisi</th>
                  <th scope="col" className="px-4 md:px-6 py-3 text-left text-xs md:text-sm font-medium text-white uppercase tracking-wider">No HP</th>
                  <th scope="col" className="px-4 md:px-6 py-3 text-left text-xs md:text-sm font-medium text-white uppercase tracking-wider">Password</th>
                  <th scope="col" className="px-4 md:px-6 py-3 text-left text-xs md:text-sm font-medium text-white uppercase tracking-wider">Aksi</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {userList.map((user, index) => (
                  <tr key={user.id}>
                    <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm text-gray-700">{index + 1}.</td>
                    <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.nama}</td>
                    <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm text-gray-700">{user.email}</td>
                    <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm text-gray-700">{user.posisi}</td>
                    <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm text-gray-700">{user.nohp}</td>
                    <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm text-gray-700">••••••••</td>
                    <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => navigate(`/edit-user/${user.id}`)}
                          className="p-1 rounded-full hover:bg-gray-100"
                          title="Edit User"
                        >
                          <AiFillEdit className="text-blue-500 text-lg hover:text-blue-700" />
                        </button>
                        <button
                          onClick={() => handleDelete(user.id)}
                          className="p-1 rounded-full hover:bg-gray-100"
                          title="Hapus User"
                        >
                          <AiFillDelete className="text-red-500 text-lg hover:text-red-700" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}