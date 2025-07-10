import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TableCard } from "../components/TableCard";

const API_BASE = import.meta.env.VITE_API_URL;

export const Home = () => {
  const navigate = useNavigate();
  const [tables, setTables] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
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

        if (!res.ok) {
          if (res.status === 401) {
            alert("⛔ Token หมดอายุ กรุณาเข้าสู่ระบบใหม่");
            localStorage.removeItem("token");
            navigate("/");
            return;
          }
          throw new Error("ไม่สามารถโหลดโต๊ะได้");
        }

        const data = await res.json();
        if (!data.tables) throw new Error("ไม่พบข้อมูลโต๊ะ");
        setTables(data.tables);
      } catch (err) {
        console.error("❌ fetch tables error:", err);
        alert("เกิดข้อผิดพลาดขณะโหลดโต๊ะ");
      }
    };

    fetchTables();
  }, [navigate]);

  const handleJoinTable = async (tableId) => {
    const token = localStorage.getItem("token");

    try {
      const res = await fetch(`${API_BASE}/api/join_table/${tableId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({}),
      });

      const data = await res.json();

      if (res.ok) {
        navigate(`/lobby/${tableId}`);
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
        {tables.map((table) => (
          <TableCard
            key={table.id}
            tableNumber={table.id}
            players={table.members.length}
            status={table.is_full ? "เต็ม" : "ว่าง"} // ✅ ป้องกัน table.status undefined
            onJoin={handleJoinTable}
          />
        ))}
      </div>
    </>
  );
};
