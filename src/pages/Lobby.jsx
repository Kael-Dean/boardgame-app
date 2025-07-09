import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const API_BASE = import.meta.env.VITE_API_URL;

export const Lobby = () => {
  const { tableId } = useParams();
  const navigate = useNavigate();
  const [members, setMembers] = useState([]);

  const fetchMembers = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`${API_BASE}/api/table/${tableId}/members`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) {
        throw new Error("Failed to fetch members");
      }

      const data = await res.json();
      setMembers(data);
    } catch (err) {
      console.error("❌ Failed to fetch members:", err);
      alert("เกิดข้อผิดพลาดในการโหลดสมาชิก");
    }
  };

  const handleLeave = async () => {
    const token = localStorage.getItem("token");
    try {
      await fetch(`${API_BASE}/api/leave_table/${tableId}`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });
      navigate("/home");
    } catch (err) {
      console.error("❌ Failed to leave table:", err);
      alert("ออกจากโต๊ะไม่สำเร็จ");
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
    <div className="p-6 text-white">
      <h2 className="text-3xl font-bold mb-4">โต๊ะที่ {tableId}</h2>
      <ul className="mb-4 space-y-2">
        {members.map((user) => (
          <li key={user.id} className="bg-white/10 p-3 rounded shadow">
            🧙‍♂️ {user.username}
          </li>
        ))}
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
