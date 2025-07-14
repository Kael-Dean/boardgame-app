export const TableCard = ({ tableNumber, players, onJoin }) => {
  return (
    <div className="glass bg-white/20 backdrop-blur-md border border-white/10 rounded-xl shadow-xl p-5 transition
     active:scale-105 active:shadow-2xl cursor-pointer">

      {/* ส่วนหัวของการ์ดแสดงเลขโต๊ะ */}
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-xl font-bold text-white drop-shadow">โต๊ะที่ {tableNumber}</h2>
      </div>

      {/* แสดงจำนวนผู้เล่น */}
      <p className="text-sm text-white/90 drop-shadow-sm mb-4">ผู้เล่น: {players} คน</p>

      {/* ปุ่มเข้าร่วมโต๊ะจะแสดงเสมอ */}
      <button
        onClick={() => {
          console.log("🟡 ปุ่มเข้าร่วมถูกคลิก");
          onJoin();
        }}
        className="w-full py-2 mt-1 bg-yellow-300 hover:bg-yellow-400 active:bg-yellow-400
        text-black font-bold rounded-lg transition duration-200 shadow-md"
      >
        เข้าร่วมโต๊ะ
      </button>
    </div>
  );
};
