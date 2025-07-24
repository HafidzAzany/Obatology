import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BsFillExclamationDiamondFill } from "react-icons/bs";
import { ImSpinner2 } from "react-icons/im";
import { obatAPI } from "../../services/obatAPI"; // Pastikan sudah ada fetchUsers di sini
import logo from "../../assets/logo.png"; // opsional

export default function Login() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [dataForm, setDataForm] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDataForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const users = await obatAPI.fetchUsers();

      const found = users.find(
        (u) => u.email === dataForm.username && u.password === dataForm.password
      );

      if (found) {
        // Simpan user ke sessionStorage atau state manajemen jika perlu
        // sessionStorage.setItem("user", JSON.stringify(found));
        navigate("/admin");
      } else {
        setError("Username atau password salah!");
      }
    } catch (err) {
      console.error("Gagal login:", err);
      setError("Terjadi kesalahan saat login.");
    }

    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto p-6">
      {/* <div className="flex justify-center mb-6">
        <img src={logo} alt="Logo" className="h-12" />
      </div> */}

      <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>

      {error && (
        <div className="bg-red-200 mb-5 p-4 text-sm text-gray-700 rounded flex items-center">
          <BsFillExclamationDiamondFill className="text-red-600 mr-2 text-lg" />
          {error}
        </div>
      )}

      {loading && (
        <div className="bg-gray-200 mb-5 p-4 text-sm rounded flex items-center">
          <ImSpinner2 className="mr-2 animate-spin" />
          Mohon tunggu...
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={dataForm.username}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400"
            placeholder="kamu@example.com"
            required
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={dataForm.password}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400"
            placeholder="********"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
        >
          {loading ? "Loading..." : "Login"}
        </button>
      </form>

      <div className="mt-4 flex justify-between">
        <button
          type="button"
          onClick={() => navigate("/forgot")}
          className="text-sm text-blue-500 hover:underline"
        >
          Forgot Password?
        </button>
        <button
          type="button"
          onClick={() => navigate("/register")}
          className="text-sm text-blue-500 hover:underline"
        >
          Register
        </button>
      </div>
    </div>
  );
}
