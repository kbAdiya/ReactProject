import "./about.css"
import Navbar from "./navbar";
import BtsMain from "./assets/bts-main.jpg"
function About() {
  return (
    <section id="about" className="about text-center">
    
        <img src={BtsMain} alt="BTS" className="about-bg" />
                <div className="about-overlay">
                    <div className="about-text">
                         <h2>About project</h2>
                          <p>This website was created by a fan to share love and appreciation for BTS — from their music, achievements, and messages to fun facts and updates. Here, you can explore profiles, watch videos, and celebrate everything BTS stands for. </p>
                     </div>
                     
                </div> 
    </section>
  );
}

export default About;