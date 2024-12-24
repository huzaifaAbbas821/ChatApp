import React from "react";
import { BiLogOut } from "react-icons/bi";
import UseLogout from "../../hooks/useLogout.js";

function LogoutBtn() {
  const { loading, logout } = UseLogout();



  return (
    <div className="absolute bottom-4 left-0 bg-transparent"
    style={{ backdropFilter: 'blur(20px)' }}>
      {loading ? (
        <span className="loading loading-spinner"></span>
      ) : (
        <BiLogOut
          onClick={logout}
          className="w-8 h-8 text-[#1c2229] cursor-pointer"
        />
      )}
    </div>
  );
}

export default LogoutBtn;
