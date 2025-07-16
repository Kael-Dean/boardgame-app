<div
  ref={sidebarRef}
  className={`fixed top-[60px] left-0 w-64 h-[calc(100%-60px)] text-white z-50 shadow-lg pt-4
    transition-transform duration-300 ease-in-out transform
    ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
  style={{
    backgroundImage: "url('/BG/bg-sidebar.png')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
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
