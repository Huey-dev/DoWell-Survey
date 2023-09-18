import React from "react";
import { PiListFill } from "react-icons/pi";

const Header = () => {
  return (
    <div className="p-5 shadow-lg flex">
      <button className="border-none">
        <PiListFill />
      </button>
    </div>
  );
};

export default Header;
