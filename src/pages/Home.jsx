import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TableCard } from "../components/TableCard";

const tableData = [
  { id: 1, players: "2-4", status: "available" },
  { id: 2, players: "2-6", status: "full" },
  { id: 3, players: "3-5", status: "available" },
  { id: 4, players: "4-6", status: "available" },
  { id: 5, players: "2-5", status: "full" },
  { id: 6, players: "3-4", status: "available" },
];

const API_BASE = import.meta.env.VITE_API_URL;

export const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("⛔ กรุณาเข้าสู่ระบบก่อนใช้งาน");
      navigate("/");
    }
  }, [navigate]);

  const handleJoinTable = async (tableNumber) => {
    const token = localStorage.getItem("token");
    console.log("🔑 Token ที่จะส่ง:", token);

    try {
      const res = await fetch(`${API_BASE}/api/join_table/${tableNumber}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({}) // ✅ ต้องมี body
      });

      const data = await res.json();

      if (res.ok) {
        navigate(`/lobby/${tableNumber}`);
      } else {
        alert(data.error || "ไม่สามารถเข้าร่วมโต๊ะได้");
      }
    } catch (err) {
      console.error("❌ join_table error", err);
      alert("เกิดข้อผิดพลาด");
    }
  };

  return (
    <>
      <p className="bg-gradient-to-b from-yellow-300 to-yellow-500 text-black font-bold py-4 px-6 text-2xl 
        rounded-lg shadow-[0_4px_0_#b8860b] active:translate-y-1 active:shadow-none transition-all mb-6 w-fit mx-auto text-center">
        เลือกโต๊ะที่คุณต้องการเข้าร่วม
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {tableData.map((table) => (
          <TableCard
            key={table.id}
            tableNumber={table.id}
            players={table.players}
            status={table.status}
            onJoin={handleJoinTable}
          />
        ))}
      </div>
    </>
  );
};
