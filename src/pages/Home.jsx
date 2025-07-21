import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TableCard } from "../components/TableCard";

const API_BASE = import.meta.env.VITE_API_URL;

export const Home = () => {
  const navigate = useNavigate();
  const [tables, setTables] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const currentTableId = localStorage.getItem("currentTableId");

    // 🔁 ถ้าเคยเข้าร่วมโต๊ะ ให้ redirect ไปที่ lobby
    if (token && currentTableId) {
      navigate(`/lobby/${currentTableId}`);
      return;
    }

    if (!token) {
      alert("⛔ กรุณาเข้าสู่ระบบก่อนใช้งาน");
      navigate("/");
      return;
    }

    const fetchTables = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/table_list`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.status === 401) {
          alert("⛔ Token หมดอายุ กรุณาเข้าสู่ระบบใหม่");
          localStorage.removeItem("token");
          navigate("/");
          return;
        }

        if (!res.ok) throw new Error("ไม่สามารถโหลดโต๊ะได้");

        const data = await res.json();
        setTables(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("❌ fetchTables error:", err);
        alert("เกิดข้อผิดพลาดขณะโหลดโต๊ะ");
      }
    };

    fetchTables();
  }, [navigate]);

  const handleJoinTable = async (tableId) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("⛔ ไม่พบ token");
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/api/join_table/${tableId}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (res.ok) {
        // ✅ บันทึกว่าอยู่โต๊ะนี้แล้ว
        localStorage.setItem("currentTableId", tableId);
        navigate(`/lobby/${tableId}`);
      } else {
        alert(data.error || "ไม่สามารถเข้าร่วมโต๊ะได้");
      }
    } catch (err) {
      console.error("❌ join_table error:", err);
      alert("เกิดข้อผิดพลาดขณะเข้าร่วมโต๊ะ");
    }
  };

  return (
    <div className="p-6 text-white">
      <p
        className="bg-gradient-to-b from-yellow-300 to-yellow-500 text-black font-bold py-4 px-6 text-2xl 
        rounded-lg shadow-[0_4px_0_#b8860b] active:translate-y-1 active:shadow-none transition-all mb-6 w-fit mx-auto text-center"
      >
        เลือกโต๊ะที่คุณต้องการเข้าร่วม
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {tables.map((table) => (
          <TableCard
            key={table.table_id}
            tableNumber={table.table_id}
            players={table.current_players || 0}
            onJoin={() => handleJoinTable(table.table_id)}
          />
        ))}
      </div>
    </div>
  );
};
