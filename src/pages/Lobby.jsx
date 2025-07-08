import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export const Lobby = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [usersInRoom, setUsersInRoom] = useState([]);

  const API_BASE = import.meta.env.VITE_API_URL;

  console.log("🌐 API_BASE:", API_BASE);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Token not found. กรุณา Login ใหม่");
      return;
    }

    // ✅ แก้ path นี้จาก /api/table/${id}/members ➜ /api/${id}/members
    fetch(`${API_BASE}/api/${id}/members`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("📦 Response from backend:", data);

        if (Array.isArray(data)) {
          setUsersInRoom(data);
        } else {
          console.error("❌ Unexpected data format:", data);
          alert("โหลดรายชื่อผู้เล่นผิดพลาด");
        }
      })
      .catch((err) => {
        console.error("❌ load members error", err);
        alert("ไม่สามารถโหลดรายชื่อผู้เล่นได้");
      });
  }, [id]);

  const handleLeaveTable = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Token not found. กรุณา Login ใหม่");
      return;
    }

    try {
      // ✅ แก้ path นี้จาก /api/leave_table/${id} ➜ /api/leave_table/${id} (คงเดิมเพราะ backend ใช้อันนี้)
      const res = await fetch(`${API_BASE}/api/leave_table/${id}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        navigate("/home");
      } else {
        const data = await res.json();
        alert(data.error || "ออกจากโต๊ะไม่สำเร็จ");
      }
    } catch (err) {
      console.error("❌ leave_table error", err);
      alert("เกิดข้อผิดพลาดขณะออกจากโต๊ะ");
    }
  };

  return (
    <>
      <h2 className="text-2xl font-bold text-center mb-4 text-white">
        ผู้เล่นในโต๊ะที่ {id}
      </h2>

      <ul className="bg-white/10 p-4 rounded-xl shadow-md backdrop-blur">
        {usersInRoom.map((user, index) => (
          <li
            key={index}
            className="py-2 text-white border-b border-white/20"
          >
            {user.username} ({user.age} ปี)
          </li>
        ))}
      </ul>

      <div className="mt-6 text-center">
        <button
          onClick={handleLeaveTable}
          className="bg-red-500 hover:bg-red-600 active:bg-red-700 text-white py-2 px-6 rounded-lg font-bold shadow-md transition"
        >
          ออกจากโต๊ะ
        </button>
      </div>
    </>
  );
};
