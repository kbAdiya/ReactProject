import { useState, useEffect } from "react";
import MemberList from "./memberList";
import "./styles/mainBts.css";
import BtsMain from "./assets/bts-main.jpg"


function MainBTS() {
 const [info, setInfo] = useState("");

  useEffect(() => {
    fetch(
      `https://en.wikipedia.org/w/api.php?action=query&prop=extracts&exintro=true&explaintext=true&titles=BTS&format=json&origin=*`
    )
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        const page = Object.values(data.query.pages)[0];
        const firstParagraph = page.extract.split("\n")[0];
        setInfo(firstParagraph);
      })
       .catch((err) => {
      console.error(err);
      setInfo("Failed to load BTS info.");
    });
  }, []);



  return (
    <div className="main-bts">

        <section id="hero" className="hero">
               <img src={BtsMain} alt="BTS" className="hero-bg" />
          <div className="hero-overlay">
              <div className="hero-text">
                   <h2>BTS</h2>
                    <p>{info}</p>
               </div>
               
          </div>      
        </section>

      

            <section id="members">
        <MemberList />
           </section>
  
    </div>
  );
}

export default MainBTS;