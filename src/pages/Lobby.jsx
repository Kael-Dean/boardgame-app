import { useParams, useNavigate } from "react-router-dom";

export const Lobby = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const usersInRoom = ["Alice", "Bob", "Charlie"];

  const handleLeaveTable = () => {
    navigate("/home");
  };

  return (
    <>
      <h2 className="text-2xl font-bold text-center mb-4">
        ผู้เล่นในโต๊ะที่ {id}
      </h2>

      <ul className="bg-white/10 p-4 rounded-xl shadow-md backdrop-blur">
        {usersInRoom.map((name, index) => (
          <li key={index} className="py-2 text-white border-b border-white/20">
            {name}
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



