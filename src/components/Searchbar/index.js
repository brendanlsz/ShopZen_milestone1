import React from "react";
import "./Searchbar.css";

const Searchbar = () => {
  return (
    <div className="search">
      <input
        type="text"
        className="search-input"
        placeholder="Search..."
        name=""
      />{" "}
      <a href="#" className="search-icon">
        {" "}
        <i className="fa fa-search"></i>{" "}
      </a>{" "}
    </div>
  );
};

export default Searchbar;
