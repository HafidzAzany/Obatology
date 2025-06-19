import ListMenu from "./ListMenu";
import { BiFoodMenu } from "react-icons/bi";

export default function Sidebar() {
  return (
    <div className="min-h-screen w-64 bg-[#61B6F8] flex flex-col justify-start">
      {/* Logo */}
      <div className="flex flex-col items-center py-8 border-b border-white/30">
        <img src="../img/logo.png" alt="Logo" className="w-40 h-40 object-contain" />
        {/* <h1 className="text-white font-bold text-xl mt-3">OBATOLOGY</h1>
        <p className="text-sm text-white/80">Your Health, Our Priority</p> */}
      </div>

      {/* Menu List */}
      <nav className="mt-4 flex-1">
        <ListMenu />
      </nav>
    </div>
  );
}
