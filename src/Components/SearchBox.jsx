import { useState } from "react";
import React from "react";

function SearchBox({ onSearch }) {
  const [searchval, setsearchval] = useState("");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSearch(searchval);
      }}
      className="flex gap-2"
    >
      <input
        type="text"
        value={searchval}
        onChange={(e) => setsearchval(e.target.value)}
        placeholder="Search images..."
        className="border p-2 rounded w-full"
      />
      <button type="submit" className="bg-blue-600 text-white px-4 rounded">
        Search
      </button>
    </form>
  );
}

export default SearchBox;
