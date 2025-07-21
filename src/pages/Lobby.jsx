import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const API_BASE = import.meta.env.VITE_API_URL;

export const Lobby = () => {
  const { tableId } = useParams();
  const navigate = useNavigate();
  const [members, setMembers] = useState([]);

  const currentUser = JSON.parse(localStorage.getItem("user"));

  const fetchMembers = async () => {
    const token = localStorage.getItem("token");

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

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    } else {
      fetchMembers();
      const interval = setInterval(fetchMembers, 3000);
      return () => clearInterval(interval);
    }
  }, [tableId]);

  return (
    <div className="p-6 text-white text-center">
      <h2 className="text-3xl font-bold mb-6">โต๊ะที่ {tableId}</h2>

      <ul className="mb-6 space-y-2">
        {members.map((user) => {
          const isMe = user.user_id === currentUser?.id;
          return (
            <li
              key={user.user_id}
              className={`p-3 rounded shadow ${
                isMe ? "bg-yellow-500" : "bg-white/40"
              }`}
            >
              🧙‍♂️ {user.username} {isMe && "(me)"}
            </li>
          );
        })}
      </ul>

      <div className="flex justify-center">
        <button
          onClick={handleLeave}
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
        >
          ออกจากโต๊ะ
        </button>
      </div>
    </div>
  );
};

