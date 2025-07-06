import { Outlet } from "react-router-dom";
import NavBarLanding from "../components/ComponentsGuest/NavBarLanding";
import FooterLanding from "../components/ComponentsGuest/FooterLanding";

export default function LandingLayout() {
  return (
    <div data-aos="fade-down">
      <div className="bg-[#050827] text-white min-h-screen flex flex-col">
        <NavBarLanding />
        <main className="flex-grow">
          <Outlet />
        </main>
        <FooterLanding />
      </div>
    </div>
  );
}
