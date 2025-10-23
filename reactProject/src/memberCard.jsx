import { useEffect, useState } from "react";
import "./memberCard.css"
function MemberCard({ name }) {
  const [info, setInfo] = useState("");

  
  const wikiNames = {
    Jin: "Jin_(singer)",
    Suga: "Suga",
    "J-Hope": "J-Hope",
    RM: "RM_(musician)",
    Jimin: "Jimin",
    V: "V_(singer)",
    Jung: "Jung_Kook",
  };

  useEffect(() => {
  
    const wikiTitle = wikiNames[name] 

    fetch(
      `/wikiapi/w/api.php?action=query&prop=extracts&exintro=true&explaintext=true&titles=${encodeURIComponent(wikiTitle)}&format=json`
    )
      .then((res) => res.json())
      .then((data) => {
         const page = Object.values(data.query.pages)[0];
        setInfo(page.extract);
      })
       .catch((err) => {
      console.error(err);
      setInfo("Failed to load member info.");
    });
  }, [name]);

  return (
    <div className="member-card">
      <h2>{name}</h2>
      <p>{info || "Loading..."}</p>
    </div>
  );
}

export default MemberCard;
