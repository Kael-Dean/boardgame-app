import { useState } from "react";
import { BsList, BsX } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { ImProfile } from "react-icons/im";
import { FaSearch, FaHome } from "react-icons/fa";

export const AppLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <>
      {/* BG */}
      <div
        className="fixed inset-0 -z-10 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/BG/board1.jpg')" }}
      />

      {/* Topbar */}
      <div className="fixed top-0 left-0 w-full h-15 bg-black/50 text-white flex items-center justify-between px-4 z-50 shadow-md backdrop-blur">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="text-amber-500 hover:text-yellow-200 text-4xl transition drop-shadow-[0_0_4px_#facc15]"
          >
            {isSidebarOpen ? <BsX /> : <BsList />}
          </button>
          <h1 className="text-2xl font-bold font-vt text-[#00fde4d2] drop-shadow-[0_0_4px_#facc15]">
            Happynest Boardgame Plus
          </h1>
        </div>
        <p className="text-sm font-vt">{user?.name || "Guest"}</p>
      </div>

      {/* Sidebar */}
      {isSidebarOpen && (
        <div className="fixed top-0 left-0 w-64 h-full bg-[#684328] text-white z-40 shadow-lg pt-20">
          <div className="p-5 border-b border-white/40">👤 {user?.name || "Guest"}</div>
          <div className="p-5 text-red-400 hover:text-red-200 cursor-pointer" onClick={handleLogout}>
            🚪 Logout
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="pt-28 pb-24 px-4">{children}</div>

      {/* BottomNav */}
      <div className="fixed bottom-0 left-0 w-full h-16 glass bg-gradient-to-b from-[#3b2417]/50 to-[#1a0f07]/90 text-yellow-300 flex justify-around items-center z-50 shadow-inner border-t border-yellow-900/20">
        <button className="flex flex-col items-center text-xs hover:text-yellow-100 transition">
          <FaHome className="text-xl" />
          <span>Home</span>
        </button>
        <button className="flex flex-col items-center text-xs hover:text-yellow-100 transition">
          <FaSearch className="text-xl" />
          <span>Search</span>
        </button>
        <button className="flex flex-col items-center text-xs hover:text-yellow-100 transition">
          <ImProfile className="text-xl" />
          <span>Profile</span>
        </button>
      </div>
    </>
  );
};
