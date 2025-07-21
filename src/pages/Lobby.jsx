import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const API_BASE = import.meta.env.VITE_API_URL;

export const Lobby = () => {
  const { tableId } = useParams();
  const navigate = useNavigate();
  const [members, setMembers] = useState([]);

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("⛔ กรุณาเข้าสู่ระบบ");
      navigate("/");
      return;
    }

    const fetchMembers = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/table/${tableId}/members`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.status === 401) {
          alert("⛔ Token หมดอายุ กรุณาเข้าสู่ระบบใหม่");
          localStorage.removeItem("token");
          navigate("/");
          return;
        }

        if (!res.ok) throw new Error("ไม่สามารถโหลดสมาชิกได้");

        const data = await res.json();
        if (!data.members || !Array.isArray(data.members)) {
          throw new Error("ข้อมูลสมาชิกผิดพลาด");
        }

        setMembers(data.members);
      } catch (err) {
        console.error("❌ fetchMembers error:", err);
        alert("เกิดข้อผิดพลาดในการโหลดสมาชิก");
        navigate("/home");
      }
    };

    fetchMembers();
    const interval = setInterval(fetchMembers, 3000);
    return () => clearInterval(interval);
  }, [tableId, navigate]);

  const handleLeave = async () => {
    const token = localStorage.getItem("token");

    try {
      const res = await fetch(`${API_BASE}/api/leave_table/${tableId}`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "ออกจากโต๊ะไม่สำเร็จ");
      }

      navigate("/home");
    } catch (err) {
      console.error("❌ leave_table error:", err);
      alert("ออกจากโต๊ะไม่สำเร็จ");
      navigate("/home");
    }
  };

  return (
    <div className="p-6 text-white">
      <h2 className="text-3xl font-bold mb-4">โต๊ะที่ {tableId}</h2>

      <ul className="mb-6 space-y-2">
        {members.map((user) => {
          const isMe = String(user.user_id) === userId;

          return (
            <li
              key={user.user_id}
              className={`p-3 rounded shadow transition ${
                isMe ? "bg-yellow-300 text-black font-bold" : "bg-white/10 text-white"
              }`}
            >
              🧙‍♂️ {user.username} {isMe && "(คุณ)"}
            </li>
          );
        })}
      </ul>

      <button
        onClick={handleLeave}
        className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
      >
        ออกจากโต๊ะ
      </button>
    </div>
  );
};
