import { useState, useEffect } from "react";
import MemberCard from "./memberCard";
import "./memberList.css";
import Jin from "./assets/member-jin.jpg";
import Suga from "./assets/member-suga.jpg";
import JHope from "./assets/member-jhope.jpg";
import RM from "./assets/member-rm.jpg";
import Jimin from "./assets/member-jimin.jpg";
import V from "./assets/member-v.jpg";
import Jung from "./assets/member-jk.jpg";
import wtf from "wtf_wikipedia";
const memberImages = {
  Jin,
  Suga,
  "J-Hope": JHope,
  RM,
  Jimin,
  V,
  Jung
};
function MemberList() {
 
 const [members, setMembers] = useState([]);
 const [selectedMember, setSelectedMember] = useState(null);
 const [search, setSearch] = useState("");


useEffect(() => {
  
    fetch(
      "/wikiapi/w/api.php?action=parse&page=BTS&prop=wikitext&format=json"
    )
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        const rawText = data.parse.wikitext["*"];  
        //  console.log(rawText);
        const wtext = wtf(rawText);
        const section = wtext.section("Members");
        if (section) {
          const lines = section
            .text()
            .split("\n")
            .map(line =>
            line.replace(/^[\*\s]+/, "") 
          )
            .filter((line) => line.trim() !== "")
          setMembers(lines);
        }
      })
       .catch((err) => {
      console.error(err);
      setMembers(["Failed to load members."]);
    });
  }, []);

  return (
    <div className="member-list">
      <h3>BTS Members</h3>

<div className="member-search">
  <input
    type="text"
    placeholder="Filter..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
  />
</div>


   <div className="members-grid">
    {members
    .filter((name) =>
      name.toLowerCase().includes(search.toLowerCase())
    )
    .map((name) => {
      const shortName = name.split(" ")[0];
      const img = memberImages[shortName];
      return (
        <div
          key={name}
          className="member-item"
          onClick={() => setSelectedMember(shortName)}
        >
          <img src={img} alt={name} className="member-img" />
          <p>{name}</p>
        </div>
      );
    })}

      </div>

       {selectedMember && (
         <div className="overlay" > 
          <div className="overlay-card" >
            <button className="close-btn" onClick={() => setSelectedMember(null)}>
              ×
            </button>
            <MemberCard name={selectedMember} />
          </div>
        </div>
      )}

    </div>
  );
 
}

export default MemberList;
