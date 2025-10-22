import "./navbar.css";
import { useState } from "react";
function Navbar() {
   
  const handleScroll = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };
 
  return (
    <nav className="navbar">
      <ul>
        <li onClick={() => handleScroll("hero")}>BTS</li>
        <li onClick={() => handleScroll("members")}>Members</li>
        <li onClick={() => handleScroll("discography")}>Discography</li>
        <li onClick={() => handleScroll("about")}>About</li>
      </ul>
    </nav>
  );
}

export default Navbar;
