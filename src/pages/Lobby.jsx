import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export const Lobby = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [usersInRoom, setUsersInRoom] = useState([]);

  const API_BASE = import.meta.env.VITE_API_URL;


  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch(`${API_BASE}/api/table/${id}/members`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setUsersInRoom(data))
      .catch((err) => {
        console.error("load members error", err);
        alert("ไม่สามารถโหลดรายชื่อผู้เล่นได้");
      });
  }, [id]);

  const handleLeaveTable = async () => {
    const token = localStorage.getItem("token");

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
  };

  return (
    <>
      <h2 className="text-2xl font-bold text-center mb-4">
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

