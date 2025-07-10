export const TableCard = ({ tableNumber, players, status, onJoin }) => {
  const isAvailable = status === "ว่าง"; // ✅ เปลี่ยนจาก "available"

  const statusStyle = isAvailable
    ? "bg-green-500/70 text-green-100 shadow-green-400/30"
    : "bg-red-600/70 text-red-100 shadow-red-400/30";

  const statusText = isAvailable ? "ว่าง" : "ไม่ว่าง";

  return (
    <div className="glass bg-white/20 backdrop-blur-md border border-white/10 rounded-xl shadow-xl p-5 transition active:scale-105 active:shadow-2xl cursor-pointer">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-xl font-bold text-white drop-shadow">โต๊ะที่ {tableNumber}</h2>
        <span className={`px-3 py-1 rounded-full text-xs font-semibold shadow-md border border-white/10 backdrop-blur-sm ${statusStyle}`}>
          {statusText}
        </span>
      </div>

      <p className="text-sm text-white/90 drop-shadow-sm mb-4">ผู้เล่น: {players} คน</p>

      {isAvailable && (
        <button
          onClick={() => onJoin?.(tableNumber)}
          className="w-full py-2 mt-1 bg-yellow-300 hover:bg-yellow-400 active:bg-yellow-400 text-black font-bold rounded-lg transition duration-200 shadow-md"
        >
          เข้าร่วมโต๊ะ
        </button>
      )}
    </div>
  );
};
