import { NavLink } from "react-router-dom";
import { RiDashboardLine } from "react-icons/ri";
import { GiMedicinePills } from "react-icons/gi";
import { AiFillMedicineBox } from "react-icons/ai";
import { HiDocumentReport } from "react-icons/hi";
import { BsPeople } from "react-icons/bs";
import { useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

export default function ListMenu() {
  const [openObat, setOpenObat] = useState(false);

  const menuClass = ({ isActive }) =>
    `flex items-center w-full px-4 py-3 rounded-l-full transition-all duration-150 font-medium text-lg
     ${
       isActive
         ? "bg-white text-[#61B6F8] shadow-md"
         : "text-white hover:bg-white/20"
     }`;

  return (
    <ul className="w-full space-y-1 text-base">
      <li>
        <NavLink to="/admin" className={menuClass}>
          <RiDashboardLine className="text-xl mr-3" />
          Dashboard
        </NavLink>
      </li>

      <li>
        <div
          onClick={() => setOpenObat(!openObat)}
          className="flex items-center justify-between text-white px-4 py-3 cursor-pointer hover:bg-white/20 rounded-l-full"
        >
          <div className="flex items-center space-x-3">
            <GiMedicinePills className="text-xl" />
            <span >Data Obat</span>
          </div>
          {openObat ? <FiChevronUp /> : <FiChevronDown />}
        </div>

        {openObat && (
          <ul className="ml-10 mt-1 space-y-1">
            <li>
              <NavLink to="/obat" className={menuClass}>
                List of Medicines
              </NavLink>
            </li>
            <li>
              <NavLink to="/grup" className={menuClass}>
                Medicine Groups
              </NavLink>
            </li>
          </ul>
        )}
      </li>

      <li>
        <NavLink to="/inventory" className={menuClass}>
          <AiFillMedicineBox className="text-xl mr-3" />
          Data Obat Masuk
        </NavLink>
      </li>

      <li>
        <NavLink to="/laporan" className={menuClass}>
          <HiDocumentReport className="text-xl mr-3" />
          Laporan
        </NavLink>
      </li>

      <li>
        <NavLink to="/user" className={menuClass}>
          <BsPeople className="text-xl mr-3" />
          Data User
        </NavLink>
      </li>
    </ul>
  );
}
