import { useEffect, useRef, useState } from "react";
import { BsList, BsX } from "react-icons/bs";
import { useNavigate, Outlet, useLocation } from "react-router-dom";
import { ImProfile } from "react-icons/im";
import { FaSearch, FaHome, FaShoppingBasket } from "react-icons/fa";

export const AppLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  const goTo = (path) => {
    setIsSidebarOpen(false);
    navigate(path);
  };

  const isActive = (path) => location.pathname === path;
  const activeStyle = "text-yellow-100 drop-shadow-[0_0_6px_#facc15] animate-pulse";
  const inactiveStyle = "text-yellow-300 hover:text-yellow-100";

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsSidebarOpen(false);
      }
    };
    if (isSidebarOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSidebarOpen]);

  return (
    <>
      {/* พื้นหลังหลัก */}
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

      {/* Sidebar แบบใช้ภาพ bg */}
      <div
        ref={sidebarRef}
        className={`fixed top-[60px] left-0 w-64 h-[calc(100%-60px)] text-white z-50 shadow-xl pt-4
          transition-transform duration-300 ease-in-out transform
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
        style={{
          backgroundImage: "url('/BG/bg-sidebar.png')",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      >
        <div className="p-5 border-b border-white/40 text-xl font-vt bg-black/40">
          👤 {user?.name || "Guest"}
        </div>
        <div
          className="p-5 text-red-400 hover:text-red-200 cursor-pointer text-xl font-vt bg-black/30"
          onClick={handleLogout}
        >
          🚪 Logout
        </div>
      </div>

      {/* Backdrop คลุมเนื้อหาหลัง Sidebar */}
      {isSidebarOpen && (
        <div
          className="fixed top-[60px] left-0 w-full h-[calc(100%-60px)] bg-black/40 z-40"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="pt-28 pb-24 px-4">
        <Outlet />
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 w-full h-16 glass bg-gradient-to-b from-[#3b2417]/50 to-[#1a0f07]/90 text-yellow-300 flex justify-around items-center z-50 shadow-inner border-t border-yellow-900/20">
        <button
          onClick={() => goTo("/home")}
          className={`flex flex-col items-center text-xs transition ${isActive("/home") ? activeStyle : inactiveStyle}`}
        >
          <FaHome className="text-xl" />
          <span>Home</span>
        </button>

        <button
          onClick={() => goTo("/search")}
          className={`flex flex-col items-center text-xs transition ${isActive("/search") ? activeStyle : inactiveStyle}`}
        >
          <FaSearch className="text-xl" />
          <span>Search</span>
        </button>

        <button
          onClick={() => goTo("/basket")}
          className={`flex flex-col items-center text-xs transition ${isActive("/basket") ? activeStyle : inactiveStyle}`}
        >
          <FaShoppingBasket className="text-xl" />
          <span>Basket</span>
        </button>

        <button
          onClick={() => goTo("/profile")}
          className={`flex flex-col items-center text-xs transition ${isActive("/profile") ? activeStyle : inactiveStyle}`}
        >
          <ImProfile className="text-xl" />
          <span>Profile</span>
        </button>
      </div>
    </>
  );
};
