import React from "react";
import { Search as SearchIcon } from "lucide-react";

export default function Search() {
  return (
    <div className="bg-white border border-gray-300 rounded-full flex items-center px-6 py-2 w-full max-w-xl shadow-sm">
      <SearchIcon className="text-gray-500 w-5 h-5" />

      <input
        type="text"
        placeholder="Search in r/plantpathology"
        className="bg-transparent text-gray-800 placeholder-gray-400 focus:outline-none ml-3 w-full"
      />
    </div>
  );
}
