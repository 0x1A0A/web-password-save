import React, { memo } from "react";

export default function Logout() {
  const logout = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <div className="group ml-auto mr-2" onClick={logout}>
      <div className="rounded-md border-2 border-solid border-slate-100 px-2 py-1 transition-all group-hover:bg-slate-100">
        <span className="text-sm text-slate-100 transition-all group-hover:text-neutral-800">
          LOGOUT
        </span>
      </div>
    </div>
  );
}
