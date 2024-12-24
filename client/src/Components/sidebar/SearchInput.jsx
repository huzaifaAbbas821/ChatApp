import React, { useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import useConversation from "../../zustand/useConversation";
import UseGetConversation from "../../hooks/useGetConversation.js";
import toast from "react-hot-toast";

function SearchInput() {
  const [search, setSearch] = useState("");
  const [filteredConversations, setFilteredConversations] = useState([]);
  const { setSelectedConversation } = useConversation();
  const { conversations } = UseGetConversation();

  // Filter conversations dynamically based on search term
  const filterConversations = (searchTerm) => {
    const lowerSearchTerm = searchTerm.toLowerCase();
    return conversations.filter((conversation) =>
      conversation.username.toLowerCase().includes(lowerSearchTerm)
    );
  };

  // Handle typing in the search box
  const handleChange = (e) => {
    const searchTerm = e.target.value;
    setSearch(searchTerm);

    if (searchTerm.trim() === "") {
      setFilteredConversations([]); // Clear suggestions if input is empty
    } else {
      const filtered = filterConversations(searchTerm);
      setFilteredConversations(filtered);
    }
  };

  // Handle selecting a conversation
  const handleSelectConversation = (conversation) => {
    setSelectedConversation(conversation);
    setSearch("");
    setFilteredConversations([]);
  };

  // Handle search submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!search.trim()) return;

    const filtered = filterConversations(search.trim());
    if (filtered.length === 1) {
      setSelectedConversation(filtered[0]);
      setSearch("");
      setFilteredConversations([]);
    } else {
      toast.error("No Such User Found");
    }
  };

  return (
    <div className="relative">
      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        <input
          type="text"
          placeholder="Search…"
          className="input input-bordered rounded-full w-full"
          value={search}
          onChange={handleChange}
        />
        <button type="submit" className="btn btn-circle bg-[#65758c] text-white">
          <IoSearchSharp className="w-6 h-6 outline-none" />
        </button>
      </form>

      {/* Search Suggestions Dropdown */}
      {filteredConversations.length > 0 && (
        <ul className="absolute z-10 bg-[#1c2229] shadow-lg rounded-md mt-2 w-full max-h-40 overflow-auto">
          {filteredConversations.map((conversation) => (
            <li
              key={conversation._id}
              onClick={() => handleSelectConversation(conversation)}
              className="px-4 py-2 text-lg font-semibold cursor-pointer hover:bg-[#65758c] hover:text-slate-950"
            >
              {conversation.username}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SearchInput;
