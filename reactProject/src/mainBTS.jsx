import { useState, useEffect } from "react";
import MemberList from "./memberList";
import "./mainBTS.css";
import BtsMain from "./assets/bts-main.jpg"
import Navbar from "./navbar";

function MainBTS() {
 const [info, setInfo] = useState("");

  useEffect(() => {
    fetch(
      `/wikiapi/w/api.php?action=query&prop=extracts&exintro=true&explaintext=true&titles=BTS&format=json`
    )
      .then((res) => res.json())
      .then((data) => {
        const page = data.query.pages[Object.keys(data.query.pages)[0]];
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
         <Navbar />
        <section id="hero" className="hero">
               <img src={BtsMain} alt="BTS" className="hero-bg" />
          <div className="hero-overlay">
              <div className="hero-text">
                   <h2>BTS</h2>
                    <p>{info}</p>
               </div>
               <div >
                <button className="button-more">more</button>
               </div>
          </div>      
        </section>

      

            <section id="members">
        <MemberList />
           </section>
  

     

        <section id="discography">
        <h3>Discography (Coming Soon)</h3>
      </section>

 {/* <div>
      <iframe width="560" height="315" src="https://www.youtube.com/embed/gwMa6gpoE9I?si=lgaiC7LOFY5QAnZP&amp;start=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
    </div> */}
    </div>
  );
}

export default MainBTS;