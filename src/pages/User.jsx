import { useEffect, useState } from "react";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { obatAPI } from "../services/obatAPI";
import LoadingSpinner from "../components/LoadingSpinner";
import EmptyState from "../components/EmptyState";

export default function UserList() {
  const [userList, setUserList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
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

  const filteredUsers = userList.filter((user) =>
    `${user.nama} ${user.email} ${user.posisi} ${user.nohp}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Manajemen Pengguna 👤</h2>
        <button
          onClick={() => navigate("/tambah-user")}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg text-sm shadow-md"
        >
          Tambah User
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-x-auto">
        <div className="px-4 py-3 border-b border-gray-200 flex justify-between items-center">
          <h3 className="text-base font-semibold text-gray-700">Daftar Pengguna</h3>
          <input
            type="text"
            placeholder="🔍 Cari pengguna..."
            className="p-2 text-sm border rounded-lg w-200"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {loading && <LoadingSpinner text="Memuat data user..." />}
        {!loading && error && <EmptyState text={error} />}
        {!loading && filteredUsers.length === 0 && <EmptyState text="Tidak ada hasil yang cocok." />}

        {!loading && filteredUsers.length > 0 && (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-blue-600">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase">#</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase">Nama</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase">Email</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase">Posisi</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase">No HP</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase">Password</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase">Aksi</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.map((user, index) => (
                <tr key={user.id}>
                  <td className="px-4 py-4">{index + 1}</td>
                  <td className="px-4 py-4">{user.nama}</td>
                  <td className="px-4 py-4">{user.email}</td>
                  <td className="px-4 py-4">{user.posisi}</td>
                  <td className="px-4 py-4">{user.nohp}</td>
                  <td className="px-4 py-4">••••••••</td>
                  <td className="px-4 py-4">
                    <div className="flex space-x-2">
                      <button onClick={() => navigate(`/edit-user/${user.id}`)} className="hover:text-blue-700 text-blue-500">
                        <AiFillEdit />
                      </button>
                      <button onClick={() => handleDelete(user.id)} className="hover:text-red-700 text-red-500">
                        <AiFillDelete />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
