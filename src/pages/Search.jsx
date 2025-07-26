import { useState } from "react";
import { FaFilter } from "react-icons/fa";
import Topbar from "../components/Topbar";
import FilterPanel from "../components/FilterPanel";

export const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilter, setShowFilter] = useState(false);

  const handleSearchChange = (e) => setSearchTerm(e.target.value);
  const toggleFilter = () => setShowFilter(!showFilter);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Topbar />

      <div className="flex items-center gap-2 px-4 mt-4">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="ค้นหาเกม..."
          className="flex-1 p-2 rounded bg-white/10 text-white outline-none"
        />
        <button onClick={toggleFilter} className="text-white text-xl p-2">
          <FaFilter />
        </button>
      </div>

      {showFilter && (
        <div className="bg-white/5 p-4 mt-3 mx-4 rounded-lg border border-white/10 shadow-lg">
          <FilterPanel />
        </div>
      )}

      <div className="mt-6 px-4">
        
        <p className="text-white/70 text-sm">ผลลัพธ์สำหรับ: {searchTerm}</p>
        {/* TODO: map เกมที่ตรงกับ searchTerm และ filter */}
      </div>
    </div>
  );
};
