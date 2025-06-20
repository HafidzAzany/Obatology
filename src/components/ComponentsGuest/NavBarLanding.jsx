import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";

export default function NavBarLanding() {
  return (
    <header className="bg-[rgb(190,211,227)] text-white py-4 shadow-md z-50">
      <div className="container mx-auto flex items-center justify-between px-4">
        <div className="text-2xl flex items-center gap-2">
          <img src={logo} alt="Logo" className="h-30 w-20 object-contain" />
          <Link
            to="/landing"
            className="text-[rgb(19,100,255)] hover:text-[rgb(196,227,190)] hover:font-bold transition"
          >
            Obatology
          </Link>
        </div>
        <nav className="space-x-6 text-sm hidden md:flex">
          <a
            href="#Home"
            className="text-[rgb(0,0,0)] font-light hover:text-[rgb(19,100,255)] hover:font-bold transition"
          >
            Home
          </a>
          <Link
            to="/about"
            className="text-[rgb(0,0,0)] font-light hover:text-[rgb(19,100,255)] hover:font-bold transition"
          >
            About Us
          </Link>
          <Link
            to="/products"
            className="text-[rgb(0,0,0)] font-light hover:text-[rgb(19,100,255)] hover:font-bold transition"
          >
            Produk
          </Link>

          <a
            href="#Contact Us"
            className="text-[rgb(0,0,0)] font-light hover:text-[rgb(19,100,255)] hover:font-bold transition"
          >
            Contact Us
          </a>
        </nav>
        <div className="space-x-2 hidden md:block">
          <Link
            to="/login"
            className="px-6 py-2 border border-cyan-400 text-[rgb(19,100,255)] rounded-full hover:bg-cyan-400 hover:text-white transition"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="px-6 py-2 bg-cyan-400 text-white rounded-full hover:bg-cyan-500 transition"
          >
            Daftar
          </Link>
        </div>
      </div>
    </header>
  );
}
